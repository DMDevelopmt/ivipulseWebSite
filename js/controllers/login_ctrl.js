//création du contrôleur "login_ctrl"
app.controller("login_ctrl", function ($scope, $http, $rootScope, $location, $cookies, me) {
	
	console.log("LoginCtrl initialized");

	$scope.user = {};
	$scope.card = {};
	$scope.password_check = "";

	$scope.loggedIn = !!$rootScope.globals.currentUser;

	var init = function() {

		if($rootScope.globals.currentUser){
			var req = {
        		method: 'GET',
        		url: ROOT_URL + "/users/me",
		        headers: {
		        	token: $rootScope.globals.currentUser.token
			    }
        	};

        	$http.defaults.headers.token = $rootScope.globals.currentUser.token;
        	$http(req)
        	.success(function(user) {
        		console.log("login_ctrl, user = " , $scope.user);
        		$scope.user = user;
        		$scope.card._sender = user;
        		
        	})
		}		
	};

	init();
	console.log

	


	/**
	 * La méthode email_login permet à un utilisateur de 
	 * se connecter via email.
	 * Elle fait appel à la fonction login de la factory 'me'
	 * @return {[type]}
	 */
	$scope.email_login = function () {

	//appel de la fonction login de la factory "me"
	me.login($scope.user.email, $scope.user.password)
	//1er callback, s'exécute lorsque la méthode me.login
	//a terminé son exécution
	.then(function(user) {
		//stocke l'objet user renvoyé par la factory dans le scope
		$rootScope.user = user;
		$scope.loggedIn = true;
		$scope.err.message = null;
      	//console.log("user_name : " + user.first_name);
			$location.path('/store');
	})
	.catch(function(err) {
		$scope.err.message = err;
	});
	
	},

	$scope.email_signin = function () {

		console.log("email : " + $scope.user.email);
		console.log("password : " + $scope.user.password);
		console.log("password_check : " + $scope.password_check);
		//on vérifie la correspondance des mots de passe
		if($scope.user.password !== $scope.password_check) {
			$scope.err.message = "Les mots de passe de sont pas identiques";
		}

		else {
			me.signin($scope.user.email, $scope.user.password)
  		//1er callback, s'exécute lorsque la méthode me.login
  		//a terminé son exécution
  		.then(function(res) {
  			//stocke l'objet renvoyé par la factory dans le scope
  			$scope.user = res;
  			$scope.err.message = null;
  			$location.path("/signin");
  		})
      //récupération du message d'erreur
  		.catch(function(err) {
  			$scope.err.message = err;
  		});
		}
	};

	$scope.logout = function () {
		$scope.loggedIn = false;
		$rootScope.globals = {};
		$cookies.remove('globals');
		$http.defaults.headers.token = '';
	},

	/**
	 * La méthode update permet de mettre à jour
	 * les infos .
	 * Elle fait appel à la fonction update de la factory 'me'
	 * 
	 */
	$scope.update= function(){

		//appel de la fonction update de la factory "me"
		 me.update($scope.user)
		 //1er callback, s'exécute lorsque la méthode me.update
		//a terminé son exécution
		 .then(function(res) {
			//stocke l'objet tmp_user renvoyé par la factory dans le scope
			$scope.user = res;
			$scope.err.message = null;
			console.log("user_name : " + res.password);
			$location.path("/signin");
		})
		.catch(function(err) {
			$scope.err.message = err;
		});
	}


	/*$scope.clicPhoto = function() {
  var actions, buttons, imageData, ref;
  console.log("clic photo");
  if ($scope.editing) {
    ref = init_buttons_camera(), actions = ref.actions, buttons = ref.buttons;
    if (typeof Camera === "undefined" || Camera === null) {
      imageData = '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';
      return me.sendPictureB64(imageData).then(function(avatar) {
        return o_("setting avatar", $scope.tmp_user.avatar = avatar);
      });
    } else {
      return window.as_close = $ionicActionSheet.show({
        buttons: _.map(actions, function(value, key) {
          return {
            text: key
          };
        }),
        titleText: 'Changer sa photo de profil',
        cancelText: 'Annuler',
        buttonClicked: function(index) {
          var options;
          as_close();
          options = {
            quality: 90,
            destinationType: Camera.DestinationType.DATA_URL,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 400,
            targetHeight: 400,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
          };
          if (index === 0) {
            options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
          } else {
            options.sourceType = Camera.PictureSourceType.CAMERA;
          }
          return $cordovaCamera.getPicture(options).then(function(imageData) {
            o_("sendPictureB64");
            return me.sendPictureB64(imageData);
          }).then(function(avatar) {
            o_("setting avatar", $scope.tmp_user.avatar = avatar);
            return o_("upload done!");
          });
        }
      });
    }
  }
};*/


});