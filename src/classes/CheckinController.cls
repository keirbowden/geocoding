public class CheckinController {
	@AuraEnabled
    public static String StoreUserLocation(Decimal latitude, Decimal longitude) 
    {
        String result='SUCCESS';
        try
        {
	        User u=new User(id=UserInfo.getUserId(),
    	                    Location__Latitude__s=latitude,
        	                Location__Longitude__s=longitude,
            	            Location_Timestamp__c=System.now());
			update u;
        }
        catch (Exception e)
        {
            result=e.getMessage();
        }
        
        return result;
    }
}