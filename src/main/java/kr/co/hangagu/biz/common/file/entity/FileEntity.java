package kr.co.hangagu.biz.common.file.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "FILE_MNG_TB")
public class FileEntity {
    @Id
    @Column(name = "FILE_KEY")
    private String fileKey;

    @Column(name = "BD_KEY")
    private String bdKey;

    @Column(name = "SERVER_FILE_PATH")
    private String serverFilePath;

    @Column(name = "SERVER_FILE_NM")
    private String serverFileNm;

    @Column(name = "FILE_ORG_NM")
    private String fileOrgNm;

    public String getFileKey() {
        return fileKey;
    }

    public void setFileKey(String fileKey) {
        this.fileKey = fileKey;
    }

    public String getBdKey() {
        return bdKey;
    }

    public void setBdKey(String bdKey) {
        this.bdKey = bdKey;
    }

    public String getServerFilePath() {
        return serverFilePath;
    }

    public void setServerFilePath(String serverFilePath) {
        this.serverFilePath = serverFilePath;
    }

    public String getServerFileNm() {
        return serverFileNm;
    }

    public void setServerFileNm(String serverFileNm) {
        this.serverFileNm = serverFileNm;
    }

    public String getFileOrgNm() {
        return fileOrgNm;
    }

    public void setFileOrgNm(String fileOrgNm) {
        this.fileOrgNm = fileOrgNm;
    }
}
