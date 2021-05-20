package kr.co.hangagu.biz.member.cart.service;


import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.hangagu.biz.member.cart.dao.CartDao;
import kr.co.hangagu.biz.member.cart.entity.CartEntity;
import kr.co.hangagu.common.constants.HangaguConstant;
import kr.co.hangagu.common.constants.HangaguConstant.Code;
import kr.co.hangagu.common.response.Response;
import kr.co.hangagu.common.util.StringUtils;

/**
 * CartService
 * 장바구니(카트) 관련 서비스
 */
@Service
public class CartService {
	
	@Autowired
	private CartDao cartDao;
	
	/**
	 * 장바구니 정보 조회
	 * @param memKey 회원 키
	 * @param cartStatus 장바구니 저장 상태
	 * @param deleteYn 삭제 여부
	 * @return 장바구니 정보 리스트와 성공여부를 반환한다. 정보가 없거나 조회에 실패할 경우 실패값을 반환한다. 
	 * @author sylim
	 * 2021.04.24
	 */
	@Transactional
	public Response selectCartList(String memKey, HangaguConstant.Cart cartStatus, String deleteYn) throws Exception {
		Response res = new Response();
		
		try {
			List<CartEntity> cartList = cartDao.findByMemKeyAndCartStatusAndDeleteYn(memKey, cartStatus, deleteYn);
			if(cartList.size() != 0) {
				res.setCode(Code.SUCCESS.getKey());
				res.setData(cartList);
			} else {
				res.setCode(Code.FAIL.getKey());
			}
		} catch(Exception e) {
			res.setCode(Code.FAIL.getKey());
			e.printStackTrace();
		}
		
		return res;
	}
	
	/**
	 * 장바구니 정보 추가
	 * @param cartEntity 저장할 장바구니 정보
	 * @return 추가한 장바구니 정보 리스트와 성공여부를 반환한다. 등록에 실패할 경우 실패값을 반환한다. 
	 * @author sylim
	 * 2021.04.24
	 */
	@Transactional
	public Response insertCart(CartEntity cartEntity) throws Exception {
		Response res = new Response();
		
		try {
			cartDao.save(cartEntity);
			
			res.setCode(Code.SUCCESS.getKey());
			res.setData(cartEntity);
			
		} catch(Exception e) {
			res.setCode(Code.FAIL.getKey());
			e.printStackTrace();
		}
		
		return res;
		
	}
	
	/**
	 * 장바구니 상세 정보 조회
	 * @param cartKey 조회할 장바구니 키
	 * @return 장바구니 상세 정보와 성공 여부를 반환한다. 정보가 없거나 조회에 실패할 경우 실패값을 반환한다. 
	 * @author sylim
	 * 2021.04.24
	 */
	@Transactional
	public Response selectCartDetail(int cartKey) throws Exception {
		Response res = new Response();
		
		try {
			CartEntity cartInfo = cartDao.findByCartKey(cartKey);
			if(!StringUtils.getDefaultValue(cartInfo, "").equals("")) {
				res.setCode(Code.SUCCESS.getKey());
				res.setData(cartInfo);
			} else {
				res.setCode(Code.FAIL.getKey());
			}
		} catch(Exception e) {
			res.setCode(Code.FAIL.getKey());
			e.printStackTrace();
		}
		
		return res;
	}
	
	/**
	 * 장바구니 정보 수정
	 * @param cartKey 수정할 장바구니 키
	 * @param cartEntity 수정할 장바구니 정보
	 * @return 장바구니 정보 수정 성공 여부를 반환한다. 수정에 실패할 경우 실패값을 반환한다. 
	 * @author sylim
	 * 2021.04.24
	 */
	@Transactional
	public Response updateCart(int cartKey, CartEntity cartEntity) {
		Response res = new Response();
		
		try {
			CartEntity existing = cartDao.findByCartKey(cartKey);
			copyNonNullProperties(cartEntity, existing);
			cartDao.save(existing);
			
			res.setCode(Code.SUCCESS.getKey());
			res.setData(existing);
			
		} catch(Exception e) {
			res.setCode(Code.FAIL.getKey());
			e.printStackTrace();
		}
		
		return res;
	}
	
	/**
	 * 수정 시 명시된 정보만 수정할 수 있도록 null이 아닌 정보를 복사
	 * @author sylim
	 * 2021.04.24
	 */
	public static void copyNonNullProperties(Object src, Object target) {
		BeanUtils.copyProperties(src, target, getNullPropertyNames(src));
	}
	
	/**
	 * 수정 시 명시된 정보만 수정할 수 있도록 null인 정보 얻기
	 * @author sylim
	 * 2021.04.24
	 */
	public static String[] getNullPropertyNames(Object source) {
		final BeanWrapper src = new BeanWrapperImpl(source);
		java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();
		
		Set<String> emptyNames = new HashSet<String>();
		for(java.beans.PropertyDescriptor pd: pds) {
			Object srcValue = src.getPropertyValue(pd.getName());
			if(srcValue == null) emptyNames.add(pd.getName());
		}
		
		String[] result = new String[emptyNames.size()];
		return emptyNames.toArray(result);
	}
	
}
