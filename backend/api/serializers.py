from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "confirm_password", "profile_picture"]
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {"required": True},
            "profile_picture": {"required": False},  # 👈 optional
        }

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def validate(self, data):
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        user = User.objects.create_user(
            username=validated_data.get("username"),
            email=validated_data["email"],
            password=validated_data["password"],
            profile_picture=validated_data.get("profile_picture"),  # handles optional
        )
        return user

class EmailLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        user = authenticate(username=email, password=password)
        if user is None:
            raise serializers.ValidationError("Invalid email or password.")
        if not user.is_active:
            raise serializers.ValidationError("User account is disabled.")

        data["user"] = user
        return data
