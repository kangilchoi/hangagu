package kr.co.hangagu.biz.member.order.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.hangagu.biz.member.order.dao.OrderDao;
import kr.co.hangagu.biz.member.order.entity.OrderEntity;
import kr.co.hangagu.biz.member.orderProduct.dao.OrderProductDao;
import kr.co.hangagu.biz.member.orderProduct.entity.OrderProductEntity;
import kr.co.hangagu.common.constants.HangaguConstant;
import kr.co.hangagu.common.constants.HangaguConstant.Code;
import kr.co.hangagu.common.constants.PrimaryKeyType;
import kr.co.hangagu.common.response.Response;
import kr.co.hangagu.common.util.StringUtils;

/**
 * OrderService
 * 주문 관련 서비스
 */
@Service
public class OrderService {
	
	@Autowired
	private OrderDao orderDao;
	
	@Autowired
	private OrderProductDao orderProductDao;
	
	/**
	 * 주문 정보 조회
	 * @param memKey 회원 키
	 * @param deleteYn 삭제 여부
	 * @return 주문 정보 리스트와 성공여부를 반환한다. 정보가 없거나 조회에 실패할 경우 실패값을 반환한다. 
	 * @author sylim
	 * 2021.04.24
	 */
	@Transactional
	public Response selectOrderList(String memKey, String deleteYn, HangaguConstant.Oder odStatus) throws Exception {
		Response res = new Response();
		
		try {
			List<Map<String, Object>> orderList = orderDao.findAllOfOrder(memKey, deleteYn, odStatus);
			
			if(!orderList.isEmpty()) {
				res.setCode(Code.SUCCESS.getKey());
				res.setData(orderList);
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
	 * 주문 정보 추가
	 * @param orderEntity 저장할 주문 정보
	 * @return 등록 성공여부를 반환한다.
	 * @author sylim
	 * 2021.04.24
	 */
	@Transactional
	public Response insertOrder(OrderEntity orderEntity) throws Exception {
		Response res = new Response();
		
		try {
			String odKey = orderDao.makeKey(PrimaryKeyType.ORDER.getValue());
			orderEntity.setOdKey(odKey);
			
			orderDao.save(orderEntity);
			
			int cnt = orderEntity.getOrderProducts().size();
			
			for(int i = 0; i < cnt; i++) {
				String odPmKey = orderProductDao.makeKey(PrimaryKeyType.ORDER_PRODUCT.getValue()); 
				orderEntity.getOrderProducts().get(i).setOdPmKey(odPmKey);
				orderEntity.getOrderProducts().get(i).setOdKey(orderEntity);
			  
				orderProductDao.save(orderEntity.getOrderProducts().get(i)); 
			}
			 
			res.setCode(Code.SUCCESS.getKey());
			
		} catch(Exception e) {
			res.setCode(Code.FAIL.getKey());
			e.printStackTrace();
		}
		
		return res;
	}
	
	/**
	 * 주문  상세 정보 조회
	 * @param odKey 조회할 주문 키
	 * @return 주문 상세 정보와 성공 여부를 반환한다. 정보가 없거나 조회에 실패할 경우 실패값을 반환한다. 
	 * @author sylim
	 * 2021.04.24
	 */
	@Transactional
	public Response selectOrderDetail(String odKey) throws Exception {
		Response res = new Response();
		
		try {
			Object[] orderInfo = orderDao.findAllByOdKey(odKey);
			if(orderInfo.length != 0) {
				res.setCode(Code.SUCCESS.getKey());
				res.setData(orderInfo);
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
	 * 주문 정보 수정
	 * @param cartEntity 수정할 주문 정보
	 * @return 주문 정보 수정 성공 여부를 반환한다. 수정에 실패할 경우 실패값을 반환한다. 
	 * @author sylim
	 * 2021.04.24
	 */
	@Transactional
	public Response updateOrder(OrderEntity orderEntity) throws Exception {
		Response res = new Response();
		
		try {
			OrderEntity updatedOrderList = orderDao.findByOdKey(orderEntity.getOdKey());
			
			if(updatedOrderList != null) {
				if(!"".equals(StringUtils.getDefaultValue(orderEntity.getOrderProducts(), ""))) {
					int cnt = orderEntity.getOrderProducts().size();
					for(int i = 0; i < cnt; i++) {
						OrderProductEntity updatedOrderProductList = orderProductDao.findByOdPmKey(orderEntity.getOrderProducts().get(i).getOdPmKey());
						
						if(!"0".equals(StringUtils.getDefaultValue(orderEntity.getOrderProducts().get(i).getPmQuantity(), "0"))){
							updatedOrderProductList.setPmQuantity(orderEntity.getOrderProducts().get(i).getPmQuantity());
						}
						if(!"".equals(StringUtils.getDefaultValue(orderEntity.getOrderProducts().get(i).getDeleteYn(), ""))){
							updatedOrderProductList.setDeleteYn(orderEntity.getOrderProducts().get(i).getDeleteYn());
						}
					}
				}
				if(!"0".equals(StringUtils.getDefaultValue(orderEntity.getOdPrice(), "0"))){
					updatedOrderList.setOdPrice(orderEntity.getOdPrice());
				}
				if(!"".equals(StringUtils.getDefaultValue(orderEntity.getOdStatus(), ""))){
					updatedOrderList.setOdStatus(orderEntity.getOdStatus());
				}
			}
			
			res.setCode(Code.SUCCESS.getKey());
			
		} catch(Exception e) {
			res.setCode(Code.FAIL.getKey());
			e.printStackTrace();
		}
		
		return res;
	}
	
	//마이페이지 주문 내역
	public Response myPage(String memId) {
		Response res = new Response();
		
		Optional<List<Object>> o = orderDao.myPage(memId);
		
		if(o.isPresent()) {
			res.setCode(Code.SUCCESS.getKey());
			res.setData(o.get());
		}
		
		return res;
	}
}
