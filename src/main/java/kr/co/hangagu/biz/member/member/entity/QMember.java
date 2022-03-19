//package kr.co.hangagu.biz.member.member.entity;
//
//import static com.querydsl.core.types.PathMetadataFactory.*;
//
//import com.querydsl.core.types.dsl.*;
//
//import com.querydsl.core.types.PathMetadata;
//import javax.annotation.Generated;
//import com.querydsl.core.types.Path;
//
//
///**
// * QMember is a Querydsl query type for Member
// */
//@Generated("com.querydsl.codegen.EntitySerializer")
//public class QMember extends EntityPathBase<Member> {
//
//    private static final long serialVersionUID = 1330845726L;
//
//    public static final QMember member = new QMember("member1");
//
//    public final ComparablePath<Character> deleteYn = createComparable("deleteYn", Character.class);
//
//    public final StringPath memAddr = createString("memAddr");
//
//    public final StringPath memArea = createString("memArea");
//
//    public final StringPath memBirth = createString("memBirth");
//
//    public final StringPath memClassCd = createString("memClassCd");
//
//    public final StringPath memDetailAddr = createString("memDetailAddr");
//
//    public final StringPath memGrade = createString("memGrade");
//
//    public final StringPath memId = createString("memId");
//
//    public final StringPath memKey = createString("memKey");
//
//    public final StringPath memMail = createString("memMail");
//
//    public final ComparablePath<Character> memMailReceptYn = createComparable("memMailReceptYn", Character.class);
//
//    public final StringPath memNm = createString("memNm");
//
//    public final StringPath memPhone = createString("memPhone");
//
//    public final StringPath memPost = createString("memPost");
//
//    public final StringPath memPw = createString("memPw");
//
//    public final StringPath memTel = createString("memTel");
//
//    public final DateTimePath<java.time.LocalDateTime> modDt = createDateTime("modDt", java.time.LocalDateTime.class);
//
//    public final DateTimePath<java.time.LocalDateTime> regDt = createDateTime("regDt", java.time.LocalDateTime.class);
//
//    public final ComparablePath<Character> termsAgreeYn = createComparable("termsAgreeYn", Character.class);
//
//    public QMember(String variable) {
//        super(Member.class, forVariable(variable));
//    }
//
//    public QMember(Path<? extends Member> path) {
//        super(path.getType(), path.getMetadata());
//    }
//
//    public QMember(PathMetadata metadata) {
//        super(Member.class, metadata);
//    }
//
//}
//
