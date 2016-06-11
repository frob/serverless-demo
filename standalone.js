// Required as mock data
AWSCognito.config.update({accessKeyId: 'mock', secretAccessKey: 'mock'});

// App specific
var userPoolId = 'us-east-1_fgCWraBkF';
var appClientId = '57lq262n28o7ddt8i36jcjj7qd';

// constructed
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
         $('.session').text(session.getIdToken().getJwtToken());
      });
   }
   else logoutUser();
}

function logoutUser() {
   var cognitoUser = userPool.getCurrentUser();
   alert('Logged Out');
   if (cognitoUser != null) cognitoUser.signOut();
}
