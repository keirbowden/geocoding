public class NewDeliveryController 
{
    public Delivery__c delivery {get; set;}
    
    public NewDeliveryController()
    {
        delivery=new Delivery__c();
    }
    
    public PageReference save()
    {
        Account acc=[select ShippingLatitude, ShippingLongitude 
                     from Account
                     where id=:delivery.From__c];
        System.debug('Account = ' + acc);
		List<User> users=[SELECT id, Location__c, Location_Timestamp__c
					 	  FROM User
					 	  WHERE DISTANCE(Location__c, GEOLOCATION(:acc.ShippingLatitude, :acc.ShippingLongitude), 'mi') < 50
                	  	  ORDER BY Location_Timestamp__c DESC];		
	
        System.debug('users = ' + users);
		if (users.size()>0)
        {
            delivery.OwnerId=users[0].id;
        }
        
        insert delivery;
        ApexPages.StandardController std=new ApexPages.standardController(delivery);
        return std.view();
    }
}