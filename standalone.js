// Required as mock data
AWSCognito.config.update({accessKeyId: 'mock', secretAccessKey: 'mock'});

// App specific
var identityPoolId = 'us-east-1:35b6094e-ff5b-44a5-ac52-e879ae263c91';
var userPoolId = 'us-east-1_fgCWraBkF';
var appClientId = '57lq262n28o7ddt8i36jcjj7qd';
var region = 'us-east-1';
var user;

// constructed
var loginId = 'cognito-idp.' + region + '.amazonaws.com/' + userPoolId;
var poolData = {
   UserPoolId: userPoolId,
   ClientId: appClientId
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

function registerUser(user) {
   var attributes = [];

   var emailData = {
      Name: 'email',
      Value: user.email
   };

   var nameData = {
      Name: 'name',
      Value: user.name
   };

   attributes.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(emailData));
   attributes.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(nameData));

   userPool.signUp(user.username, user.password, attributes, null, function (err, result) {
      if (err) {
         console.log(err);
         return;
      }
      alert('User ' + user.username + ' Created')
   });
}

function confirmUser(username, code) {
   var userData = {
      Username: username,
      Pool: userPool
   };

   var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

   cognitoUser.confirmRegistration(code, true, function (err, result) {
      if (err) {
         console.log(err);
         return;
      }
      alert('User ' + username + '  Confirmed');
   });
}

function loginUser(username, password) {
   var authenticationData = {
      Username: username,
      Password: password
   };

   var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

   var userData = {
      Username: username,
      Pool: userPool
   };

   var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

   cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
         user = cognitoUser;
         alert(username + ' Logged In');
      },
      onFailure: (err) => {
         console.log(err);
      }
   });
}

function getSession() {
   var cognitoUser = userPool.getCurrentUser();

   if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
         if (err) {
            logoutUser();
            return;
         }
         user = cognitoUser;
         $('.session').text(session.getIdToken().getJwtToken());
      });
   }
   else logoutUser();
}

function logoutUser() {
   var cognitoUser = userPool.getCurrentUser();
   if (cognitoUser != null) cognitoUser.signOut();
   alert('Logged Out - Reloading Page');
   location.reload();
}

function getUserAttributes(){
   var cognitoUser = userPool.getCurrentUser();

   if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
         if (err) {
            alert('User not logged in');
            return;
         }
         cognitoUser.getUserAttributes(function(err, data){
            if(err){
               alert('error geting profile data');
            }
            else{
               $('#profileName').text(data[1].Value);
               $('#profileEmail').text(data[1].Value);
            }
         })
      });
   }

   else alert('User not logged in');
}
