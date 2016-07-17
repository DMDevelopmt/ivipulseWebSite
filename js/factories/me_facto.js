app.factory('me', function($q, $http, $rootScope, $cookies){ 
 
  //initialisation de la variable user 
  var user = {}; 
 
  //retour de la factory 
  me = { 

    is_authenticated: false,
    _data: {},

    _token: null,

    scope: [],

    _new_user: false,
    _card_changed: false,

    state: {
    have_pulsed: false,
    unread: {
      cards: 0,
      notifs: 0,
      chats: 0,
      chats_ids: []
    },
    last_status_update: null
    },


    init: function (data) {

      this._data = {};
      this.is_authenticated = true;

      //getters
      _.each(this._getters, function (v,k) {
        if (!this[k]) {
          this._defineGetter__(k,v);
        }
      });

      //getters from _data
      
      _.each(data, function(v,k) {
        if(!this[k]){
          this.__defineGetter__(k, function(_this) {
            return function() {
              return _this._data != null ? ref[k] : void 0;
            }
          });
          this.__defineSetter__(k, function(_this) {
            return function(val) {
              return _this._data != null ? ref[k] = val : void 0;
            };
          });
        }
      });

      this.state.last_status_update = Date.now();
      //this.refresh_pending_cards();
      this.scope = this._data.sharing;

      return this;
    },
    /* 
    fonction login 
    Cette fonction permet d'authentifier un utilisateur 
    Elle retourne une promesse contenant le résultat de la requête 
 
     */ 
    login: function (email, password) { 
      //déclaration de l'objet data, pour l'appel du service de login 
      var data = { 
        email: email, 
        password: password 
      }
      //initialisation de la variable contenant la requête
      var req = {
        method: 'POST',
        url: ROOT_URL + "/users/login",
        data: data
      };


      //initialisation de la promesse de retour 
      return $q(function(resolve, reject) { 
        //appel au serveur pour la requête de login 
        //en transmettant en second paramètre l'objet data 
        //contenant l'email et le password 
        
        $http(req)
        //en cas de succès 
        .success(function(res) { 

          if(saveToken(res)){
            resolve(res.me);

            console.log("this.token ", this._token);
          }
          //si problème serveur 
          else { 
            reject("Problème interne, essayez plus tard"); 
          } 
        }) 
        //si la requête produit une erreur 
        .error(function () { 
          reject("Email ou mot de passe incorrect"); 
        }); 
      });
    },

    /* 
    Cette fonction permet d'inscrire un nouvel utilisateur 
    Elle retourne une promesse contenant le résultat de la requête 
     */ 
    signin: function (email, password) { 
 
      //déclaration de l'objet data, pour l'appel du service d'inscription 
      var data = { 
        email: email, 
        password: password 
      } 
 
      //initialisation de la promesse de retour 
      return $q(function(resolve, reject){ 
        //appel au serveur pour la requête d'inscription 
        //en transmettant en second paramètre l'objet data 
        //contenant l'email et le password 
        $http.post(ROOT_URL + "/users/signin", data, { 
 
        }) 
        //en cas de succès 
        .success(function(res) { 

          if(saveToken(res)){
            //
            //la requête 
            defMe = this.me.init(res.me);
            resolve(defMe);
          } 
          //si problème serveur 
          else { 
            reject("Problème interne, réessayez plus tard"); 
          } 
 
        }) 
        //si la requête produit une erreur 
        .error(function (e, code) { 
          //si erreur de code 400 
          if(code == 400){ 
            //on finalise la promesse en acheminant le message d'erreur 
            reject("Email déjà utilisé"); 
          } 
          else { 
            reject ("Problème interne, réessayez plus tard"); 
          } 
           
        }); 
      }); 
 
    }, 
/* 
    Cette fonction permet de mettre un jour les attributs d'un utilisateur 
    Elle retourne une promesse contenant le résultat de la requête 
     */ 

    update: function(tmp_user) {
    console.log("fonction update me.facto", tmp_user._id);
    var req = { 
        method: 'PUT',
        url: ROOT_URL + "/users/" + tmp_user._id, 
        data: tmp_user,
        headers: {
            token: $rootScope.globals.currentUser.token
                 }
      }; 
   //initialisation de la promesse de retour 
      return $q(function(resolve, reject){ 
       $http(req)
        .success(function(new_user) {
          console.log("me updated", new_user);
          if (new_user.birth_date) {
            new_user.birth_date = new Date(new_user.birth_date);
          }
          return resolve(new_user);
        }).error(reject);
      });
  },

   get_credit: $q(function(resolve, reject){

     if ($rootScope.globals) {
        var data ={};
        var req = {
              method: 'GET',
              url: ROOT_URL + "/users/get_credits",
              headers: {
                token: $rootScope.globals.currentUser.token
              },
              data: data
          };
        $http(req)
        .success(function(res){
          console.log(res);
          resolve(res);
        })
        .error(function(err) {
          console.log("Erreur requete get_credits", err);
          reject(err);
        });
      }
      else {
        resolve("User introuvable");
      }
    })
  
}; 

/**
 * Cette fonction permet de sauver l'authentification de l'utilisateur connecté
 * sur le site.
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
saveToken = function (data) {

  if(data.token && data.me){

            $rootScope.globals = {
              currentUser: {
                first_name: data.me.first_name,
                last_name: data.me.last_name,
                email: data.me.email,
                token: data.token
              }
            };

            window.localStorage.token = 
              $http.defaults.headers.token = 
                this._token = data.token;

            $cookies.putObject('globals', $rootScope.globals);

            console.log("Cookie first_name: ", $rootScope.globals.currentUser.first_name)

            return true;
  }
  else
    return false;
}

/*sendPictureB64 = function(b64) {
    return $q(function(resolve, reject) {
        return $http.post(ROOT_URL + "/users/me/pictureb64", {
          b64: b64
        }).success(function(res) {
          return resolve(res.avatar);
        });
      });
  }
*/
return me;

});