from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from typing import Dict, Any

from app.core.config import settings
from app.core.security import create_access_token, get_password_hash, verify_password
from app.db.database import get_database
from app.models.user import User, UserCreate, UserLogin, UserUpdate
from app.api.deps import get_current_user

router = APIRouter()

@router.post("/register", response_model=User)
async def create_user(user: UserCreate):
    db = await get_database()
    
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Un utilisateur avec cet email existe déjà"
        )
    
    hashed_password = get_password_hash(user.password)
    new_user = User(
        email=user.email,
        firstName=user.firstName,
        lastName=user.lastName,
        password=hashed_password
    )
    
    result = await db.users.insert_one(new_user.dict(by_alias=True))
    created_user = await db.users.find_one({"_id": result.inserted_id})
    created_user["_id"] = str(created_user["_id"])
    return User(**created_user)  # Conversion en modèle Pydantic

@router.post("/login", response_model=Dict[str, str])
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db = await get_database()
    
    user = await db.users.find_one({"email": form_data.username})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not verify_password(form_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]},
        expires_delta=access_token_expires
    )
    
    await db.users.update_one(
        {"_id": user["_id"]},
        {"$set": {"lastLogin": datetime.utcnow()}}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get("/me", response_model=User)
async def get_current_user_info(current_user: Dict[str, Any] = Depends(get_current_user)):
    return User(**current_user)  # Toujours convertir

@router.put("/me", response_model=User)
async def update_user_info(
    user_update: UserUpdate,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    db = await get_database()
    
    update_data = {}
    
    # Corriger les champs selon UserUpdate
    if user_update.firstName is not None:
        update_data["firstName"] = user_update.firstName
    
    if user_update.lastName is not None:
        update_data["lastName"] = user_update.lastName
    
    if user_update.email is not None:
        if user_update.email != current_user["email"]:
            existing_user = await db.users.find_one({"email": user_update.email})
            if existing_user:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Cet email est déjà utilisé par un autre utilisateur"
                )
        update_data["email"] = user_update.email
    
    if hasattr(user_update, "password") and user_update.password is not None:
        update_data["password"] = get_password_hash(user_update.password)
    
    if user_update.profilePicture is not None:
        update_data["profilePicture"] = user_update.profilePicture
    
    if user_update.headline is not None:
        update_data["headline"] = user_update.headline
    
    if user_update.company is not None:
        update_data["company"] = user_update.company
    
    if user_update.position is not None:
        update_data["position"] = user_update.position
    
    if user_update.location is not None:
        update_data["location"] = user_update.location
    
    update_data["updatedAt"] = datetime.utcnow()
    
    await db.users.update_one(
        {"_id": current_user["_id"]},
        {"$set": update_data}
    )
    
    updated_user = await db.users.find_one({"_id": current_user["_id"]})
    
    return User(**updated_user)  # Conversion obligatoire avant retour
