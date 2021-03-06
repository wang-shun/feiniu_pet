<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="mis" uri="/tld/lvmama-tags.tld"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>super后台——销售产品列表</title>
<link href="<%=basePath%>/themes/cc.css" rel="stylesheet" type="text/css" />
<%@ include file="/WEB-INF/pages/back/base/jquery.jsp"%>
<script type="text/javascript" src="<%=basePath%>js/base/lvmama_common.js"></script>
<script charset="utf-8" src="<%=basePath %>kindeditor-4.0.2/kindeditor.js"></script>
<script charset="utf-8" src="<%=basePath %>kindeditor-4.0.2/lang/zh_CN.js"></script>
<script type="text/javascript" src="<%=basePath%>js/prod/branch.js"></script>
<%@ include file="/WEB-INF/pages/back/base/jsonSuggest.jsp"%>
<script type="text/javascript" src="<%=basePath%>js/prod/branch_item.js"></script>
<script type="text/javascript" src="<%=basePath%>js/base/ajaxupload.js"></script>
<script type="text/javascript" src="<%=basePath%>js/timeprice/time.js"></script>
<script type="text/javascript" src="<%=basePath%>js/base/log.js"></script>
<script type="text/javascript" src="<%= basePath%>js/prod/sensitive_word.js"></script>
<script type="text/javascript" >
var isTicket = false;
<s:if test='product.productType=="TICKET"'>
	isTicket = true;
</s:if>
</script>
</head>
 
<body>
<div class="main main07">
	<div class="row1">
    	<h3 class="newTit">销售产品信息
    	<s:if test="product != null">
    		&nbsp;&nbsp;&nbsp;
    		<s:if test="product.productId != null">
    			产品ID:${product.productId }
    		</s:if>
    		&nbsp;&nbsp;&nbsp;
    		<s:if test="product.productName != null">
    			产品名称：${product.productName }
    		</s:if>
    	</s:if>
    	<s:if test="product.productId != null">
    		<jsp:include page="/WEB-INF/pages/back/prod/goUpStep.jsp"></jsp:include>
    	</s:if>
    	</h3>
         <jsp:include page="/WEB-INF/pages/back/prod/product_menu.jsp"></jsp:include>
   </div><!--row1 end-->    
   <div class="row2">
   		<form class="mySensitiveForm">
   		<table class="newTable" width="100%" border="0" cellspacing="0" cellpadding="0" id="branch_tb">
          <tr class="newTableTit" align="center">
            <td>类别名称</td>
            <td>人数</td>
            <td>计价单位</td>
            <td>最小/最大订购数</td>
            <td>是否附加</td>      
            <td>是否默认</td>
            <td>在线状态</td>      
            <td>操作</td>
            <td>排序</td>
          </tr>
          <s:iterator value="productBranchList">
		          <tr id="tr_<s:property value="prodBranchId"/>" additional="<s:property value="additional"/>" prodBranchId="<s:property value="prodBranchId"/>" branchProductId="${product.productId }" 
		          visible="<s:property value="visible"/>">
		            <td><s:property value="branchName"/>(<s:property value="prodBranchId"/>)<input type="hidden" name="branchName${prodBranchId}" value="<s:property value='branchName'/>" class="sensitiveVad" /></td>
		            <td><span>成人：<s:property value="adultQuantity"/></span>
		            <span>儿童：<s:property value="childQuantity"/></span></td>
		            <td><s:property value="priceUnit"/></td>
		            <td><s:property value="minimum"/>/<s:property value="maximum"/></td>
		            <td><s:if test='additional=="true"'>是</s:if><s:else>否</s:else></td>
		            <td class="def"><s:if test="defaultBranch=='true'">是</s:if>&nbsp;</td>
		            <td class="online"><s:if test="online=='true'">上线</s:if><s:else>下线</s:else></td>
		            <td>
		            	<mis:checkPerm permCode="1478" permParentCode="${permId}">
							<a href="#timePrice" tt="PROD_PRODUCT" class="showTimePrice" param="{'prodBranchId':<s:property value="prodBranchId"/>,'editable':false}">查看时间价格</a>&nbsp;|&nbsp;
						</mis:checkPerm>
						<mis:checkPerm permCode="1434" permParentCode="${permId}">
							<a href="#timePrice" tt="PROD_PRODUCT" class="showTimePrice" param="{'prodBranchId':<s:property value="prodBranchId"/>,'editable':true}">修改时间价格</a>
						</mis:checkPerm>
						<mis:checkPerm permCode="1433" permParentCode="${permId}"><s:if test="!product.hasSelfPack()">
							<br/><a href='#pack'	class='pack'>打包采购</a>&nbsp;|&nbsp;
							</s:if>
						</mis:checkPerm>
						<a href='#edit' class='edit'>修改</a>&nbsp;|&nbsp;<a href='#deleteBranch' class='deleteBranch'>删除</a>
						<br/><a href='#delete' class='online'><s:if test="online=='true'">下线</s:if><s:else>上线</s:else></a>&nbsp;|&nbsp;
						<a href='#def' class='setdef'>设为默认</a>
						<br/><a href='#dest' class='dest'>查看类别描述</a>&nbsp;|&nbsp;
						<a href="#log" class="showLogDialog" param="{'objectType':'PROD_PRODUCT_BRANCH','objectId':<s:property value="prodBranchId"/>}">查看操作日志</a>
						<s:if test="product.productType=='HOTEL'">
						|&nbsp;<a href="#upload" class="upload" <s:if test="icon!=''">img='http://pic.lvmama.com/pics/<s:property value="icon"/>'</s:if>>上传icon</a>
						</s:if>
						<div style="display: none;border:1px solid #000;position:absolute;right:0;background:#fff;padding:10px;margin:0 2px;" class="dest"><s:property value="description"/></div>
					</td>
					<td align="center">
						<a href="<%=basePath%>prod/upProductBranch.do?prodBranchId=<s:property value="prodBranchId"/>&productId=<s:property value="product.productId"/>">↑</a>
						<a href="<%=basePath%>prod/downProductBranch.do?prodBranchId=<s:property value="prodBranchId"/>&productId=<s:property value="product.productId"/>">↓</a>
					</td>
		          </tr>
           </s:iterator>
        </table>
        </form>
    </div><!--row2 end-->
    <p><em class="button button2 newBranch">新增</em></p>
    <div style="display: block;float:none;clear: both;">
	    <s:if test="product.isAperiodic">
			<font color="red">　　　　　　　　　　　　　　&nbsp;&nbsp;请做成一个销售类别，不然会导致有效期偏差的问题；假如要做多个销售类别，请将销售产品时间价格表时间设置为一样区间段。</font>
		</s:if>
    </div>
   	<form action="<%=basePath%>prod/editProductBranch.do" onsubmit="return false" name="branchForm" style="display: none" class="section">   		
    </form> 
    <div id="uploadIconDiv" style="display: none" class="section">
		<form onsubmit="return false">
			<input type="hidden" name="prodBranchId"/>
		<table>
			<tr>
				<td>
					图片
				</td>
				<td>
					<input type="file" id="uploadFile" name="file"/>	
				</td>
			</tr>
			<tr>
				<td colspan="2"><input type="button" value="上传" id="uploadFileBtn"/>(小图为200*100)</td>
			</tr>
			<tr>
				<td class="image" colspan="2">				
				</td>
			</tr>
		</table>
		</form>
	</div>
        <div id="branchItemDiv" class="section">
        </div>
</div><!--main01 main05 end-->
<div style="display: none" id="branchFormDiv">
<s:if test='product.productType=="HOTEL"'>
<s:include value="/WEB-INF/pages/back/prod/branch/branch_form_hotel.jsp"/>
</s:if>
<s:else>
<s:include value="/WEB-INF/pages/back/prod/branch/branch_form.jsp" />
</s:else>
</div>
</body>
</html>