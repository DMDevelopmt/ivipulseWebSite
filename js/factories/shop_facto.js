app.factory('shop', function($http,$q)
{

	var ROOT_URL = 'http://192.168.1.99:8180';

		return{
				listFonds: $q(function(resolve, reject)
				{
					var req = 
					{
				        method: 'GET',
				        url: ROOT_URL + "/templates/",
				     };

					$http (req)

					.success (function(res)
					{
						if(res)
						{
							resolve(res)
						}
						else
						{
							reject("Problème interne, essayez plus tard")
						}				
					})
					.error(function () 
					{ 
	          				reject("incorrect"); 
	        		}); 
				})
			};
   });