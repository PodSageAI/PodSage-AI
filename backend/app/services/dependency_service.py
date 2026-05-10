def get_dependencies():
    return {
        "frontend": ["auth-service", "payment-service"],
        "auth-service": ["database"],
        "payment-service": ["database"]
    }
