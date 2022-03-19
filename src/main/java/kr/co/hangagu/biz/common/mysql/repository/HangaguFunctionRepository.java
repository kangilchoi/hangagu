package kr.co.hangagu.biz.common.mysql.repository;

import kr.co.hangagu.common.constants.HangaguConstant;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
public class HangaguFunctionRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public String makeKeyFunction(String keyType) {
        Query nativeQuery = entityManager.createNativeQuery(HangaguConstant.Sql.makeKey.getValue(), String.class).setParameter(1, keyType);

        List<String> result = nativeQuery.getResultList();

        return result.get(0);
    }

    public String passwordFunction(String password) {
        Query nativeQuery = entityManager.createNativeQuery(HangaguConstant.Sql.PASSWORD.getValue(), String.class).setParameter(1, password);

        List<String> result = nativeQuery.getResultList();

        return result.get(0);
    }
}
