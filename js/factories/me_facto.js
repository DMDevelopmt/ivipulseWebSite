app.factory('me', function($q, $http){ 
  //définition d'url racine du serveur d'application  
  //(a pour vocation de migrer vers le fichier principal) 
  var ROOT_URL = 'http://192.168.1.99:8180'; 
  //var ROOT_URL = 'http://192.168.0.40:8180'; 
 
  //initialisation de la variable user 
  var user = {}; 
 
  //retour de la factory 
  return { 
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
          //si le user existe 
          if(res.me) { 
            //on resout la promesse en transmettant l'attribut 'me' de  
            //la requête 
            console.log("me = " + res.me);
            resolve(res.me); 
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
          //si le user existe 
          if(res.me) { 
            //on resout la promesse en transmettant l'attribut 'me' de  
            //la requête 
            resolve(res.me); 
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
 
    } 
/* 
    Cette fonction permet de mettre un jour les attributs d'un utilisateur 
    Elle retourne une promesse contenant le résultat de la requête 
     */ 

    update: function(tmp_user) {
    var ref;
   //initialisation de la promesse de retour 
      return $q(function(resolve, reject){ 
        return $http.put(ROOT_URL + "/users/" + me._data.id, tmp_user)
        .success(function(new_user) {
          console.log("me updated", new_user);
          if (new_user.birth_date) {
            new_user.birth_date = new Date(new_user.birth_date);
          }
          return resolve(new_user);
        }).error(reject);
      };
    );
  }

}; 

});