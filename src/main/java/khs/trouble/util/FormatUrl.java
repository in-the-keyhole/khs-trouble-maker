package khs.trouble.util;

public class FormatUrl {
	
	   public static String url(String route, boolean https ) {
		   return https ? "https" : "http" + "://"+ route;
	   }

}
