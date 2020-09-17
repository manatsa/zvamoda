package zw.org.zvandiri.remote;

import android.content.Context;
import android.os.AsyncTask;
import com.squareup.okhttp.HttpUrl;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;
import org.json.JSONObject;
import zw.org.zvandiri.business.domain.District;
import zw.org.zvandiri.business.domain.Facility;
import zw.org.zvandiri.business.domain.Province;
import zw.org.zvandiri.business.util.AppUtil;
import zw.org.zvandiri.business.util.DbUtil;
import zw.org.zvandiri.toolbox.Log;

import java.io.IOException;
import java.net.SocketTimeoutException;

/**
 * Created by User on 4/2/2017.
 */
public class LoginWebService extends AsyncTask<String, Integer, String>{

    private OkHttpClient client = new OkHttpClient();
    private Context context;

    public LoginWebService(Context context) {
        this.context = context;
    }

    public HttpUrl URL() {
        return AppUtil.getLoginUrl(context).newBuilder()
                .setQueryParameter("email", AppUtil.getUsername(context))
                .build();
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
    }

    @Override
    protected String doInBackground(String... params) {
        String result = "";
        try {
            result = run();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }


    @Override
    protected void onPostExecute(String result) {
        super.onPostExecute(result);
        String msg ="";
        try {

            JSONObject jsonObject = new JSONObject(result);
            if (jsonObject != null) {
                Log.d("Cats", jsonObject.toString());
                AppUtil.savePreferences(context, AppUtil.LOGGED_IN, Boolean.TRUE);
                JSONObject facility = jsonObject.getJSONObject("primaryClinic");
                Facility f = new Facility();
                f.id = facility.getString("id");
                f.name = facility.getString("name");
                f.description = facility.getString("description");
                f.save();
                Log.d("saved facility", f.name);
            } else {
                msg = "Login Failed! Check credentials and internet connection, then try again.";
            }
        } catch (Exception e) {
            msg = "Login Failed Try Again";
        }
        DbUtil.getInstance().post(new AsyncTaskResultEvent(msg));
    }

    private String run() throws IOException {

        OkHttpClient client = new OkHttpClient();
        client = AppUtil.connectionSettings(client);
        client = AppUtil.getUnsafeOkHttpClient(client);
        client = AppUtil.createAuthenticationData(client, context);
        Response response=null;
        try {
            Request request = new Request.Builder()
                    .url(URL())
                    .build();
            response = client.newCall(request).execute();
            if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
        }catch (SocketTimeoutException e) {
            return "Server Unavailable - Try Again Later";
        }
        return response.body().string();



    }

}
