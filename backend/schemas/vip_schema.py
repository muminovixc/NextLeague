from pydantic import BaseModel

class ConfirmPurchaseSchema(BaseModel):
    sessionId: str