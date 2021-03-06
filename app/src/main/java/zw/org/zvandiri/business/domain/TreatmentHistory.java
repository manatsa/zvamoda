package zw.org.zvandiri.business.domain;

import com.activeandroid.Model;
import com.activeandroid.annotation.Column;
import com.activeandroid.annotation.Table;
import com.activeandroid.query.Delete;
import com.activeandroid.query.Select;
import com.google.gson.annotations.Expose;

import java.util.Date;
import java.util.List;

/**
 * Created by Tasunungurwa Muzinda on 12/17/2016.
 */
@Table(name = "treatment_history", id = "_id")
public class TreatmentHistory extends Model {

    @Expose
    @Column(name = "uuid")
    public String uuid;

    @Expose
    @Column(name = "created_by")
    public User createdBy;

    @Expose
    @Column(name = "modified_by")
    public User modifiedBy;

    @Expose
    @Column(name = "date_created")
    public Date dateCreated;

    @Expose
    @Column(name = "date_modified")
    public Date dateModified;

    @Expose
    @Column(name = "version")
    public Long version;

    @Expose
    @Column(name = "active")
    public Boolean active = Boolean.TRUE;

    @Expose
    @Column(name = "deleted")
    public Boolean deleted = Boolean.FALSE;

    @Expose
    @Column(name = "id")
    public String id;

    @Expose
    @Column(name = "patient")
    public Patient patient;

    @Expose
    @Column(name = "date_commenced")
    public Date dateCommenced;

    @Expose
    @Column(name = "period")
    public Period period;

    @Expose
    @Column(name = "date_collected")
    public Date dateCollected;

    @Expose
    @Column(name = "comments")
    public String comments;

    public TreatmentHistory() {
        super();
    }

    public TreatmentHistory(String id) {
        super();
        this.id = id;
    }

    public static TreatmentHistory getItem(String id) {
        return new Select()
                .from(TreatmentHistory.class).where("id = ?", id).executeSingle();
    }

    public static List<TreatmentHistory> getAll() {
        return new Select()
                .from(TreatmentHistory.class)
                .orderBy("name ASC")
                .execute();
    }

    public static void deleteItem(String id) {
        new Delete().from(TreatmentHistory.class).where("id = ?", id).executeSingle();
    }

    public static void deleteAll() {
        new Delete().from(TreatmentHistory.class).execute();
    }
}
