package kr.co.hangagu.common.vo;

import java.util.Date;

public class BaseVO {

    /** 검색조건 */
    private String searchCondition = "";

    /** 검색Keyword */
    private String searchKeyword = "";

    /** 현재페이지 */
    private Integer pageIndex = 1;

    /** 페이지갯수 */
    private Integer pageUnit = 10;

    /** 페이지사이즈 */
    private Integer pageSize = 10;

    /** 페이징 첫번째 인덱스 */
    private Integer firstIndex;

    /** 페이징 마지막 인덱스 */
    private Integer lastIndex;

    /** 페이지당 보여질 글 갯수 */
    private Integer recordCountPerPage = 10;

    /** 작성일자 */
    private Date insertDate;

    /** 작성자ID */
    private String insertId;

    /** 수정일자 */
    private Date updateDate;

    /** 수정자ID */
    private String updateId;

    /** 사용여부 */
    private String useYn;

    private String orderBy;

    private Integer totalCount;

    private String searchDateType;

    public String getSearchCondition() {
        return searchCondition;
    }

    public void setSearchCondition(String searchCondition) {
        this.searchCondition = searchCondition;
    }

    public String getSearchKeyword() {
        return searchKeyword;
    }

    public void setSearchKeyword(String searchKeyword) {
        this.searchKeyword = searchKeyword;
    }

    public Integer getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(Integer pageIndex) {
        this.pageIndex = pageIndex;
    }

    public Integer getPageUnit() {
        return pageUnit;
    }

    public void setPageUnit(Integer pageUnit) {
        this.pageUnit = pageUnit;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getFirstIndex() {
        return firstIndex;
    }

    public void setFirstIndex(Integer firstIndex) {
        this.firstIndex = firstIndex;
    }

    public Integer getLastIndex() {
        return lastIndex;
    }

    public void setLastIndex(Integer lastIndex) {
        this.lastIndex = lastIndex;
    }

    public Integer getRecordCountPerPage() {
        return recordCountPerPage;
    }

    public void setRecordCountPerPage(Integer recordCountPerPage) {
        this.recordCountPerPage = recordCountPerPage;
    }

    public Date getInsertDate() {
        return insertDate;
    }

    public void setInsertDate(Date insertDate) {
        this.insertDate = insertDate;
    }

    public String getInsertId() {
        return insertId;
    }

    public void setInsertId(String insertId) {
        this.insertId = insertId;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public String getUpdateId() {
        return updateId;
    }

    public void setUpdateId(String updateId) {
        this.updateId = updateId;
    }

    public String getUseYn() {
        return useYn;
    }

    public void setUseYn(String useYn) {
        this.useYn = useYn;
    }

    public String getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }

    public Integer getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(Integer totalCount) {
        this.totalCount = totalCount;
    }

    public String getSearchDateType() {
        return searchDateType;
    }

    public void setSearchDateType(String searchDateType) {
        this.searchDateType = searchDateType;
    }
}
