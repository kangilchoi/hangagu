package kr.co.hangagu.biz.common.file.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.web.multipart.MultipartFile;

public class FileDto {
    private String fileKey;

    private String bdKey;

    private String serverFilePath;

    private String serverFileNm;

    private String fileOrgNm;

    private String path;

    //orgin Dir
    @JsonIgnore
    String orginDir;

    /** 첨부파일 */
    private MultipartFile file;

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

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getOrginDir() {
        return orginDir;
    }

    public void setOrginDir(String orginDir) {
        this.orginDir = orginDir;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
