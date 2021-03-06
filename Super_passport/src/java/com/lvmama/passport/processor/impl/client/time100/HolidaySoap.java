package com.lvmama.passport.processor.impl.client.time100;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;

/**
 * This class was generated by Apache CXF 2.7.5
 * 2013-06-06T10:49:28.187+08:00
 * Generated source version: 2.7.5
 * 
 */
@WebService(targetNamespace = "http://www.time100.net/", name = "HolidaySoap")
@XmlSeeAlso({ObjectFactory.class})
public interface HolidaySoap {

    @WebResult(name = "productListCountResult", targetNamespace = "http://www.time100.net/")
    @RequestWrapper(localName = "productListCount", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.ProductListCount")
    @WebMethod(action = "http://www.time100.net/productListCount")
    @ResponseWrapper(localName = "productListCountResponse", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.ProductListCountResponse")
    public com.lvmama.passport.processor.impl.client.time100.ProductListCountResponse.ProductListCountResult productListCount(
        @WebParam(name = "API_KEY", targetNamespace = "http://www.time100.net/")
        java.lang.String apiKEY,
        @WebParam(name = "API_PSW", targetNamespace = "http://www.time100.net/")
        java.lang.String apiPSW,
        @WebParam(name = "Key", targetNamespace = "http://www.time100.net/")
        java.lang.String key
    );

    @WebResult(name = "productListResult", targetNamespace = "http://www.time100.net/")
    @RequestWrapper(localName = "productList", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.ProductList")
    @WebMethod(action = "http://www.time100.net/productList")
    @ResponseWrapper(localName = "productListResponse", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.ProductListResponse")
    public com.lvmama.passport.processor.impl.client.time100.ArrayOfProductList productList(
        @WebParam(name = "API_KEY", targetNamespace = "http://www.time100.net/")
        java.lang.String apiKEY,
        @WebParam(name = "API_PSW", targetNamespace = "http://www.time100.net/")
        java.lang.String apiPSW,
        @WebParam(name = "Key", targetNamespace = "http://www.time100.net/")
        java.lang.String key,
        @WebParam(name = "start", targetNamespace = "http://www.time100.net/")
        int start,
        @WebParam(name = "end", targetNamespace = "http://www.time100.net/")
        int end
    );

    @WebResult(name = "OrderCancelResult", targetNamespace = "http://www.time100.net/")
    @RequestWrapper(localName = "OrderCancel", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.OrderCancel")
    @WebMethod(operationName = "OrderCancel", action = "http://www.time100.net/OrderCancel")
    @ResponseWrapper(localName = "OrderCancelResponse", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.OrderCancelResponse")
    public com.lvmama.passport.processor.impl.client.time100.OrderCancelResponse.OrderCancelResult orderCancel(
        @WebParam(name = "API_KEY", targetNamespace = "http://www.time100.net/")
        java.lang.String apiKEY,
        @WebParam(name = "API_PSW", targetNamespace = "http://www.time100.net/")
        java.lang.String apiPSW,
        @WebParam(name = "oid", targetNamespace = "http://www.time100.net/")
        java.lang.String oid
    );

    @WebResult(name = "AddOrderBestResult", targetNamespace = "http://www.time100.net/")
    @RequestWrapper(localName = "AddOrderBest", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.AddOrderBest")
    @WebMethod(operationName = "AddOrderBest", action = "http://www.time100.net/AddOrderBest")
    @ResponseWrapper(localName = "AddOrderBestResponse", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.AddOrderBestResponse")
    public com.lvmama.passport.processor.impl.client.time100.AddOrderBestResponse.AddOrderBestResult addOrderBest(
        @WebParam(name = "API_KEY", targetNamespace = "http://www.time100.net/")
        java.lang.String apiKEY,
        @WebParam(name = "API_PSW", targetNamespace = "http://www.time100.net/")
        java.lang.String apiPSW,
        @WebParam(name = "linkman", targetNamespace = "http://www.time100.net/")
        java.lang.String linkman,
        @WebParam(name = "mobile", targetNamespace = "http://www.time100.net/")
        java.lang.String mobile,
        @WebParam(name = "Remark", targetNamespace = "http://www.time100.net/")
        java.lang.String remark,
        @WebParam(name = "OrderDetails", targetNamespace = "http://www.time100.net/")
        java.lang.String orderDetails
    );

    @RequestWrapper(localName = "HelloWorld", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.HelloWorld")
    @WebMethod(operationName = "HelloWorld", action = "http://www.time100.net/HelloWorld")
    @ResponseWrapper(localName = "HelloWorldResponse", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.HelloWorldResponse")
    public void helloWorld(
        @WebParam(name = "firstName", targetNamespace = "http://www.time100.net/")
        java.lang.String firstName,
        @WebParam(name = "lastName", targetNamespace = "http://www.time100.net/")
        java.lang.String lastName
    );

    @WebResult(name = "OrderDetailsCancelResult", targetNamespace = "http://www.time100.net/")
    @RequestWrapper(localName = "OrderDetailsCancel", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.OrderDetailsCancel")
    @WebMethod(operationName = "OrderDetailsCancel", action = "http://www.time100.net/OrderDetailsCancel")
    @ResponseWrapper(localName = "OrderDetailsCancelResponse", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.OrderDetailsCancelResponse")
    public com.lvmama.passport.processor.impl.client.time100.OrderDetailsCancelResponse.OrderDetailsCancelResult orderDetailsCancel(
        @WebParam(name = "API_KEY", targetNamespace = "http://www.time100.net/")
        java.lang.String apiKEY,
        @WebParam(name = "API_PSW", targetNamespace = "http://www.time100.net/")
        java.lang.String apiPSW,
        @WebParam(name = "oaid", targetNamespace = "http://www.time100.net/")
        java.lang.String oaid
    );

    @WebResult(name = "OrderCancelStrResult", targetNamespace = "http://www.time100.net/")
    @RequestWrapper(localName = "OrderCancelStr", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.OrderCancelStr")
    @WebMethod(operationName = "OrderCancelStr", action = "http://www.time100.net/OrderCancelStr")
    @ResponseWrapper(localName = "OrderCancelStrResponse", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.OrderCancelStrResponse")
    public java.lang.String orderCancelStr(
        @WebParam(name = "API_KEY", targetNamespace = "http://www.time100.net/")
        java.lang.String apiKEY,
        @WebParam(name = "API_PSW", targetNamespace = "http://www.time100.net/")
        java.lang.String apiPSW,
        @WebParam(name = "oid", targetNamespace = "http://www.time100.net/")
        java.lang.String oid
    );

    @WebResult(name = "AddOrderBestStrResult", targetNamespace = "http://www.time100.net/")
    @RequestWrapper(localName = "AddOrderBestStr", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.AddOrderBestStr")
    @WebMethod(operationName = "AddOrderBestStr", action = "http://www.time100.net/AddOrderBestStr")
    @ResponseWrapper(localName = "AddOrderBestStrResponse", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.AddOrderBestStrResponse")
    public java.lang.String addOrderBestStr(
        @WebParam(name = "API_KEY", targetNamespace = "http://www.time100.net/")
        java.lang.String apiKEY,
        @WebParam(name = "API_PSW", targetNamespace = "http://www.time100.net/")
        java.lang.String apiPSW,
        @WebParam(name = "linkman", targetNamespace = "http://www.time100.net/")
        java.lang.String linkman,
        @WebParam(name = "mobile", targetNamespace = "http://www.time100.net/")
        java.lang.String mobile,
        @WebParam(name = "Remark", targetNamespace = "http://www.time100.net/")
        java.lang.String remark,
        @WebParam(name = "OrderDetails", targetNamespace = "http://www.time100.net/")
        java.lang.String orderDetails
    );

    @WebResult(name = "HelloWorld1Result", targetNamespace = "http://www.time100.net/")
    @RequestWrapper(localName = "HelloWorld1", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.HelloWorld1")
    @WebMethod(operationName = "HelloWorld1", action = "http://www.time100.net/HelloWorld1")
    @ResponseWrapper(localName = "HelloWorld1Response", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.HelloWorld1Response")
    public java.lang.String helloWorld1(
        @WebParam(name = "firstName", targetNamespace = "http://www.time100.net/")
        java.lang.String firstName,
        @WebParam(name = "lastName", targetNamespace = "http://www.time100.net/")
        java.lang.String lastName
    );
    
    @WebResult(name = "productListStrResult", targetNamespace = "http://www.time100.net/")
    @RequestWrapper(localName = "productListStr", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.ProductListStr")
    @WebMethod(action = "http://www.time100.net/productListStr")
    @ResponseWrapper(localName = "productListStrResponse", targetNamespace = "http://www.time100.net/", className = "com.lvmama.passport.processor.impl.client.time100.ProductListStrResponse")
    public java.lang.String productListStr(
        @WebParam(name = "API_KEY", targetNamespace = "http://www.time100.net/")
        java.lang.String apiKEY,
        @WebParam(name = "API_PSW", targetNamespace = "http://www.time100.net/")
        java.lang.String apiPSW,
        @WebParam(name = "Key", targetNamespace = "http://www.time100.net/")
        java.lang.String key,
        @WebParam(name = "start", targetNamespace = "http://www.time100.net/")
        int start,
        @WebParam(name = "end", targetNamespace = "http://www.time100.net/")
        int end
    );
}
