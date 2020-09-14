package zw.org.zvandiri.business.util;

import android.app.DatePickerDialog;
import android.content.Context;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.preference.PreferenceManager;
import android.support.design.widget.Snackbar;
import android.util.Log;
import android.view.View;
import android.widget.*;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.squareup.okhttp.*;
import zw.org.zvandiri.business.domain.*;

import javax.net.ssl.*;
import java.io.IOException;
import java.net.Proxy;
import java.net.SocketTimeoutException;
import java.security.cert.CertificateException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

/**
 * Created by User on 12/14/2016.
 */
public class AppUtil {

    public static String LOGGED_IN = "LOGGED_IN";
    public static String USERNAME = "USERNAME";
    public static String PASSWORD = "PASSWORD";
    public static String BASE_URL = "https://db.zvandiri.org:8443/zvandiri-mobile/rest/mobile";
    public static String NAME = "NAME";
    public static String ID = "ID";
    public static String DETAILS_ID = "DETAILS_ID";
    private static AppUtil appInstance;
    private static Context mContext;
    private static Gson gson;
    private RequestQueue requestQueue;
    public static String DATE_FORMAT = "yyyy-MM-dd";
    public static MediaType JSON = MediaType.parse("application/json; charset=utf-8");

    private AppUtil(Context context) {
        mContext = context;
        requestQueue = getRequestQueue();
    }

    public static synchronized AppUtil getInstance(Context context) {
        if (appInstance == null) {
            appInstance = new AppUtil(context);
        }
        return appInstance;
    }

    public static boolean isNetworkAvailable(Context context) {
        ConnectivityManager connectivity = (ConnectivityManager) context
                .getSystemService(Context.CONNECTIVITY_SERVICE);
        if (connectivity != null) {
            NetworkInfo[] info = connectivity.getAllNetworkInfo();
            if (info != null)
                for (int i = 0; i < info.length; i++)
                    if (info[i].getState() == NetworkInfo.State.CONNECTED) {
                        return true;
                    }
        }
        return false;
    }

    public static void createLongNotification(Context context, String msg) {
        Toast.makeText(context, msg, Toast.LENGTH_LONG).show();
    }

    public static void createShortNotification(Context context, String msg) {
        Toast.makeText(context, msg, Toast.LENGTH_SHORT).show();
    }

    public static void createSnackBarShort(View view, String mgs) {
        Snackbar.make(view, mgs, Snackbar.LENGTH_SHORT)
                .setAction("Action", null).show();
    }

    public static void createSnackBarLong(View view, String mgs) {
        Snackbar.make(view, mgs, Snackbar.LENGTH_LONG)
                .setAction("Action", null).show();
    }

    public static Gson createGson() {
        GsonBuilder gsonBuilder = new GsonBuilder();
        gson = gsonBuilder.excludeFieldsWithoutExposeAnnotation().setDateFormat("yyyy-MM-dd").create();
        return gson;
    }

    public static void savePreferences(Context context, String key, Boolean value) {
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putBoolean(key, value);
        editor.commit();
    }

    public static void savePreferences(Context context, String key, String value) {
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(key, value);
        editor.commit();
    }

    public static boolean isLoggedIn(Context context) {
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context);
        return sharedPreferences.getBoolean(LOGGED_IN, Boolean.FALSE);
    }

    public static String getUsername(Context context) {
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context);
        return sharedPreferences.getString(USERNAME, "USERNAME");
    }

    public static String getPassword(Context context) {
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context);
        return sharedPreferences.getString(PASSWORD, "PASSWORD");
    }

    public static String getBaseUrl(Context context){
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context);
        return sharedPreferences.getString(BASE_URL, "BASE_URL");
    }

    public RequestQueue getRequestQueue() {
        if (requestQueue == null) {
            requestQueue = Volley.newRequestQueue(mContext);
        }
        return requestQueue;
    }

    public <T> void addToRequestQueue(Request<T> request) {
        getRequestQueue().add(request);
    }

    public static void removePreferences(Context context){
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context);
        //sharedPreferences.edit().clear().commit();
        sharedPreferences.edit().remove("LOGGED_IN").commit();
    }

    public static HttpUrl getInternalRefferalUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/static/internal-referral")).newBuilder()
                //.setQueryParameter("id", String.valueOf(AppUtil.getWebUserId(context)))
                .build();
    }

    public static HttpUrl getExternalRefferalUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/static/external-referral")).newBuilder()
                //.setQueryParameter("id", String.valueOf(AppUtil.getWebUserId(context)))
                .build();
    }

    public static HttpUrl getAssessmentUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/static/assessment")).newBuilder()
                //.setQueryParameter("id", String.valueOf(AppUtil.getWebUserId(context)))
                .build();
    }

    public static HttpUrl getIntensiveUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/static/intensive-follow-up")).newBuilder()
                //.setQueryParameter("id", String.valueOf(AppUtil.getWebUserId(context)))
                .build();
    }

    public static HttpUrl getLocationUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/static/location")).newBuilder()
                //.setQueryParameter("id", String.valueOf(AppUtil.getWebUserId(context)))
                .build();
    }

    public static HttpUrl getPositionUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/static/position")).newBuilder()
                //.setQueryParameter("id", String.valueOf(AppUtil.getWebUserId(context)))
                .build();
    }

    public static HttpUrl getEnhancedUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/static/enhanced-follow-up")).newBuilder()
                //.setQueryParameter("id", String.valueOf(AppUtil.getWebUserId(context)))
                .build();
    }

    public static HttpUrl getStableUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/static/standard-follow-up")).newBuilder()
                //.setQueryParameter("id", String.valueOf(AppUtil.getWebUserId(context)))
                .build();
    }

    public static HttpUrl getPatientUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/static/patient/cats-patients" + getUsername(context))).newBuilder()
                .setQueryParameter("email", AppUtil.getUsername(context))
                .build();
    }

    public static HttpUrl getLoginUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/patient/get-cats"));
    }

    public static HttpUrl getPushContactUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/patient/add-contact")).newBuilder()
                .build();
    }

    public static HttpUrl getPushPersonUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/person/add-person")).newBuilder()
                .build();
    }

    public static HttpUrl getPushHivSelfTestingUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/person/add-self-testing")).newBuilder()
                .build();
    }

    public static HttpUrl getPushMortalityUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/person/add-mortality")).newBuilder()
                .build();
    }

    public static HttpUrl getPushInvestigationTestUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/person/add-investigation-test")).newBuilder()
                .build();
    }

    public static HttpUrl getPushTbIptUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/person/add-tb-ipt")).newBuilder()
                .build();
    }

    public static HttpUrl getPushMentalHealthScreeningUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/person/add-mental-health-screening")).newBuilder()
                .build();
    }

    public static HttpUrl getPushPatientUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/patient/add-patient")).newBuilder()
                //.setQueryParameter("id", String.valueOf(AppUtil.getWebUserId(context)))
                .build();
    }

    public static HttpUrl getPushDisabilityUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/patient/add-disability")).newBuilder()
                //.setQueryParameter("id", String.valueOf(AppUtil.getWebUserId(context)))
                .build();
    }

    public static HttpUrl getPushReferralUrl(Context context) {
        return HttpUrl.parse(getBaseUrl(context).concat("/patient/add-referral")).newBuilder()
                //.setQueryParameter("id", String.valueOf(AppUtil.getWebUserId(context)))
                .build();
    }

    public static OkHttpClient createAuthenticationData(OkHttpClient client, final Context context) {
        client.setAuthenticator(new Authenticator() {
            @Override
            public com.squareup.okhttp.Request authenticate(Proxy proxy, Response response) {
                String credential = Credentials.basic(AppUtil.getUsername(context), AppUtil.getPassword(context));
                return response.request().newBuilder()
                        .header("Authorization", credential)
                        .build();
            }

            @Override
            public com.squareup.okhttp.Request authenticateProxy(Proxy proxy, Response response) {
                return null; // Null indicates no attempt to authenticate.
            }
        });
        return client;
    }

    public static OkHttpClient getUnsafeOkHttpClient(OkHttpClient client) {
        try {
            // Create a trust manager that does not validate certificate chains
            final TrustManager[] trustAllCerts = new TrustManager[]{
                    new X509TrustManager() {
                        @Override
                        public void checkClientTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {
                        }

                        @Override
                        public void checkServerTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {
                        }

                        @Override
                        public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                            return null;
                        }
                    }
            };

            // Install the all-trusting trust manager
            final SSLContext sslContext = SSLContext.getInstance("SSL");
            sslContext.init(null, trustAllCerts, new java.security.SecureRandom());
            // Create an ssl socket factory with our all-trusting manager
            final SSLSocketFactory sslSocketFactory = sslContext.getSocketFactory();


            client.setSslSocketFactory(sslSocketFactory);
            client.setHostnameVerifier(new HostnameVerifier() {
                @Override
                public boolean verify(String hostname, SSLSession session) {
                    return true;
                }
            });

            return client;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static OkHttpClient connectionSettings(OkHttpClient client) {
        client.setConnectTimeout(30, TimeUnit.SECONDS);
        client.setReadTimeout(30, TimeUnit.SECONDS);
        client.setWriteTimeout(30, TimeUnit.SECONDS);
        return client;
    }

    public static String run(HttpUrl httpUrl, Context context) throws IOException {
        String result = "";
        OkHttpClient client = new OkHttpClient();
        client = AppUtil.connectionSettings(client);
        client = AppUtil.createAuthenticationData(client, context);
        client = AppUtil.getUnsafeOkHttpClient(client);
        Response response = null;
        try {
            com.squareup.okhttp.Request request = new com.squareup.okhttp.Request.Builder()
                    .url(httpUrl)
                    .build();

            response = client.newCall(request).execute();

            if (AppUtil.responseCount(response) >= 3) {
                return "authentication_error";
            }

            result = response.body().string();
        } catch (SocketTimeoutException e) {
            result = "Server Unavailable - Try Again Later";
        }
        return result;

    }

    public static int responseCount(Response response) {
        int result = 1;
        while ((response = response.priorResponse()) != null) {
            result++;
        }
        return result;
    }

    public static String getStringDate(Date date) {
        if (date == null) {
            return "";
        }
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(AppUtil.DATE_FORMAT);
            return sdf.format(date);
        } catch (Exception e) {
            return null;
        }
    }

    public static String getResponeBody(OkHttpClient client, HttpUrl httpUrl, String json) {
        Response response = null;
        String result = "";
        try {
            com.squareup.okhttp.Request request = new com.squareup.okhttp.Request.Builder()
                    .url(httpUrl)
                    .post(AppUtil.getPostBody(json))
                    .build();

            response = client.newCall(request).execute();

            if (AppUtil.responseCount(response) >= 3) {
                return "authentication_error";
            }
            result = response.body().string();
        } catch (SocketTimeoutException e) {
            result = "Server Unavailable - Try Again Later";
        } catch (IOException e) {
            e.printStackTrace();
            result = e.getMessage();
        }

        return result;
    }

    public static RequestBody getPostBody(String json) {
        RequestBody body = RequestBody.create(JSON, json);
        return body;
    }

    public static Integer parseInt(String value) {
        try {
            return Integer.parseInt(value);
        }catch (NumberFormatException ex) {
            return null;
        }
    }

    public static Boolean spinnerError(Spinner spinner, String error){
        View selectedView = spinner.getSelectedView();
        Long index = spinner.getSelectedItemId();
        if(index==0){
            TextView selectedTextView = (TextView) selectedView;
            selectedTextView.setError(error);
            return false;
        }
        return true;

    }
}
