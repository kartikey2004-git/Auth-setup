# Auth-setup

User authentication
- login/logout
- email verification feature
- password reset feature using a six digit OTP sent the user email

Tech Stack use

- MongoDB 
- Express
- React 
- Node.js
- JWT ( jsonwebtoken ) for secure authentication



multi factor authentication is a security method that requires user to provide at least two diff forms of identification to access a system 


2FA : Speak easy and passport js

secure user accounts with 2FA improving the overall security of our application


passport js used for authentication purpose
strategy for the passportjs as local strategy 


for setup and verify , we are going to use a speak easy which help us to generate time based otp 


when user login through username and password , and when it matches that will be first factor of authentication

then if they matches , we need another options or another authentication


2FA or MFA and uske baad mail be ek time based otp jaaye and then we will need otp to verify the user also 

for security of user , these are two steps to user get authenticated


