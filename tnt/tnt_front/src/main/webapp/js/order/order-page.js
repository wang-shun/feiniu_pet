/*******************************************************************************
 * 订单页面交互js
 ******************************************************************************/

// placeholder 功能扩展
window.onload = function() {
	var doc = document, inputs = doc.getElementsByTagName('input'), supportPlaceholder = 'placeholder' in doc
			.createElement('input'), placeholder = function(input) {
		var text = input.getAttribute('placeholder'), defaultValue = input.defaultValue;
		if (input.value == "" || input.value == text) {
			input.value = text;
			input.style.color = 'gray';
		}

		input.onfocus = function() {
			if (input.value === text) {
				this.value = '';
				this.style.color = '';
			}
		}
		input.onblur = function() {
			if (input.value === '') {
				input.style.color = 'gray';
				this.value = text;
			}
		}
		input.onkeydown = function() {
			this.style.color = '';
		}
	};
	if (!supportPlaceholder) {
		for ( var i = 0, len = inputs.length; i < len; i++) {
			var input = inputs[i], text = input.getAttribute('placeholder');
			if (input.type === 'text' && text) {
				placeholder(input);
			}
		}
	}
}

// travellerList[${i}].receiverName
// order 精简版验证
var formValid = {};
var formSubmitValid = {};
var flag = true;
(function($, undefined) {

	var regExps = {
		empty : /^.+$/,
		userName : /^[A-Z|a-z|\u4e00-\u9fa5]{2,20}$/,
		mobile : /^((\(\d{2,3}\))|(\d{3}\-))?(13|14|15|18)\d{9}$/,
		idcard : /(^\d{15}$)|(^\d{17}[0-9Xx]$)/,
		zipcode : /^\\d{6}$/,
		email : /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/
	}

	$.FormValid = function(options) {
		var settings = {
			formID : "#js-info",
			event : "click",
			vGroup : "1",
			isValid : false,
			callback : function() {
			}
		};

		$.extend(true, settings, options || {});
		formSubmitValid[settings.vGroup] = settings;
		$(settings.formID)[settings.event](function() {
			var result = valid.bindSubmit(settings.vGroup);
			if (result) {
				formSubmitValid[settings.vGroup].isValid = result;
				settings.callback();
			}
			if (settings.event == "click") {
				return false;
			}
		});
	}

	var valid = {
		init : function(settings) {
			this.bindEvent(settings);
		},

		bindEvent : function(settings) {
			var that = this;
			$(settings.self).focus(function() {
				that.setTipState(settings, "onFocus");
			}).blur(function() {
				that.oneIsValid(settings);
				that.setTipState(settings, settings._msgType);
			});
		},

		bindSubmit : function(vGroup) {
			var isValid = true, fv = formValid[vGroup], len = fv === undefined ? 0
					: fv.length;
			for ( var i = 0; i < len; i++) {
				valid.oneIsValid(fv[i]);
				if (!fv[i].isValid) {
					isValid = fv[i].isValid;
					this.setTipState(fv[i], fv[i]._msgType);
					continue;
				}

			}

			return isValid;
		},

		// 设置显示错误消息
		setTipState : function(setting, msgType) {
			var $self = $(setting.self), index = $self.parents("dl").index(), $parents = $self
					.parents("dl").parent(), name = "";
			switch (msgType) {
			case "onFocus":
				$self.next("i.order-ei").remove();
				$self.removeClass("order-error");
				$self.parents("dl").parent().find("dl").last().find("dd").eq(0)
						.find("span").remove();
				break;
			case "error":
				if ($parents.attr("id") == "play-edit") {
					name = $self.attr("data-field");
					$self.addClass("order-error");
					$self.next("i.order-ei").remove();
					$self.after('<i class="oicon order-ei"></i>');
					if ($self.parents("dl").parent().find("dl").last().find(
							"dd").find("span[name=" + name + "]").size() == 0) {
						$self.parents("dl").parent().find("dl").last().find(
								"dd").eq(0).append(
								"<span style=\"color:red;\"  name=" + name
										+ ">" + setting.msg[setting.validIndex]
										+ "; </span>");
					}
				} else {
					$self.removeClass("order-error");
					$self.siblings("i.order-ei").remove();
					$self.parents("dl").parent().find("dl").last().find("dd")
							.eq(0).find("span[name=" + index + "]").remove();
					$self.addClass("order-error");
					if ($self[0] && $self[0].type !== "select-one") {
						$self.after('<i class="oicon order-ei"></i>');
					}

					$self.parents("dl").parent().find("dl").last().find("dd")
							.eq(0).append(
									"<span style=\"color:red;\" name=" + index
											+ ">"
											+ setting.msg[setting.validIndex]
											+ "; </span>");
				}
				break;
			case "succeed":
				break;
			}
		},

		getLength : function(setting) {
			var len = 0, $elem = $(setting.self), elem = $elem[0], elemType = elem.type, // 扩展一个属性处理模拟select控件div
			val = "";

			switch (elemType) {
			case "text":
				val = $.trim($elem.val());
				len = val === $elem.attr("placeholder") ? 0 : val.length;
				break;

			case "checkbox":
			case "radio":
				len = $("input[type='" + elemType + "']:checked").length;
				break;

			case "select-one":
				len = elem.options ? elem.options.selectedIndex : -1;
				break;
			}

			return len;
		},

		oneIsValid : function(setting) {
			var setting = setting, len = setting.valid.length;
			for ( var i = 0; i < len; i++) {
				switch (setting.valid[i]) {
				case "empty":
					this.isEmpty(setting);
					break;
				case "reg":
					this.isReg(setting);
					break;
				case "customer":
					this.isCustomer(setting);
					break;
				}
				if (!setting.isValid) {
					setting._msgType = "error";
					setting.validIndex = i;
					break;
				} else {
					setting._msgType = "succeed";
				}
			}
		},

		isEmpty : function(setting) {
			if (this.getLength(setting) !== 0) {
				setting.isValid = true;
			}
		},

		isReg : function(setting) {
			var reg = regExps[setting.regExp] || setting.regExp;
			if ($.trim($(setting.self).val()) === $(setting.self).attr(
					"placeholder")) {
				setting.isValid = false;
			} else {
				setting.isValid = reg.test($.trim($(setting.self).val()));
			}
		},
		isCustomer : function(setting) {
			setting.isValid = setting.callback(this, setting);
		}
	};

	$.fn.liteValid = function(options) {

		var settings = {
			regExp : null,
			isValid : false,
			valid : [],
			msg : [ "不能为空", "输入有误" ],
			vGroup : "1",
			self : this,
			reg : null,
			callback : function(o) {
			}
		}

		$.extend(true, settings, options || {});
		valid.init(settings);

		if (!formValid[settings.vGroup]) {
			formValid[settings.vGroup] = [];
		}

		formValid[settings.vGroup].push(settings);
	}
}(jQuery));

$(function() {
	$("input[data-field=mobileNumber]").live("keydown", function() {
		if (/^1[0-9]{2,2}[\*]{4,4}[0-9]{4,4}$/.test($(this).val())) {
			$(this).val("");
		}
	});
	// 地址
	(function() {
		// 收件人验证
		$("#address-user").liteValid({
			vGroup : "1",
			valid : [ "empty", "reg" ],
			regExp : "userName",
			msg : [ "请输入收件人姓名", "姓名只能为中文或英文,长度为2-20字符" ]
		});
		$("#address-mobile")
				.liteValid(
						{
							valid : [ "empty", "customer" ],
							msg : [ "请输入手机号码", "请输入正确的手机号码" ],
							vGroup : "1",
							callback : function(o) {
								var mobile = $("#address-mobile").val();
								if ($.trim(mobile) == "") {
									return false;
								}
								var model = $("#address-mobile").attr("model");
								if (model == "super") {
									if (!/^1[0-9]{2,2}[\*]{4,4}[0-9]{4,4}$/
											.test(mobile)
											&& !/^1[0-9]{10,}$/.test(mobile)) {
										return false;
									}
								} else {

									if (!/^((\(\d{2,3}\))|(\d{3}\-))?(13|15|14|18)\d{9}$/
											.test(mobile)) {
										return false;
									}
								}
								return true;
							}
						});
		// 城市判断
		$("#cityId").liteValid({
			vGroup : "1",
			valid : [ "reg" ],
			regExp : "empty",
			msg : [ "请选择省份", "请选择省份" ]
		});
		// 地址验证
		$("#address").liteValid({
			vGroup : "1",
			valid : [ "empty", "reg" ],
			regExp : "empty",
			msg : [ "请输入收件地址", "收件地址不能为空" ]
		});

		$.FormValid({
			formID : "#frast-submit",
			vGroup : "1"
		});

		// 地址联系人信息修改 保存, 修改切换
		$("#frast-btn").live("click", function() {
			$("#frast-edit").show();
			$("#frast-info").hide();
			formSubmitValid[1].isValid = false;
			return false;
		});
	}());
	// 更新复选框
	var updateRecever = function(listName, userRecever) {
		$label = $("label[receiver-id=" + userRecever.receiverId + "]");
		var dataInfo = "{receiverId:'" + userRecever.receiverId
				+ "', cardType:'" + userRecever.cardType + "', receiverName:'"
				+ userRecever.receiverName + "', cardNum:'"
				+ userRecever.cardNum + "', mobileNumber:'"
				+ userRecever.mobileNumber + "'}";
		if ($label.length > 0) {// 更新联系人
			$label = $("label[receiver-id=" + userRecever.receiverId + "]");
			$label.attr("data-info", dataInfo);
			$label.find("span").html(userRecever.receiverName);
		} else {// 新增联系人
			$receverList = $("dd[recever-list]");
			$
					.each(
							$receverList,
							function(i, list) {
								var checkstr = "";
								if (listName == $(list).attr("recever-list")) {
									checkstr = "checked=\"checked\"";
								}
								var html = "<label receiver-id=\""
										+ userRecever.receiverId
										+ "\" class=\"checkbox inline\" data-info=\""
										+ dataInfo
										+ "\">"
										+ "<input "
										+ checkstr
										+ " name=\""
										+ $(list).attr("recever-list")
										+ "\" autocomplete=\"off\" type=\"checkbox\" receiver-id=\""
										+ userRecever.receiverId
										+ "\" class=\"input-radio\" /><span>"
										+ userRecever.receiverName + "</span>"
										+ "</label>";
								$(list).append($(html));
							});
		}

	};

	// 订单联系人
	(function() {
		// 姓名验证绑定
		$("#order-user").liteValid({
			vGroup : "2",
			valid : [ "empty", "reg" ],
			regExp : "userName",
			msg : [ "请输入订单联系人姓名", "姓名只能为中文或英文,长度为2-20字符" ]
		});
		// 手机验证绑定
		$("#order-mobile")
				.liteValid(
						{
							valid : [ "empty", "customer" ],
							msg : [ "请输入手机号码", "请输入正确的手机号码" ],
							vGroup : "2",
							callback : function(o) {
								var mobile = $("#order-mobile").val();
								if ($.trim(mobile) == "") {
									return false;
								}
								var model = $("#order-mobile").attr("model");
								var bool = mobile.indexOf("****");

								if (model == "super" && bool !== -1) {
									if (!/^1[3458]{1,1}[0-9]{1,1}[\*]{4,4}[0-9]{4,4}$/
											.test(mobile)
											&& !/^1[0-9]{10,}$/.test(mobile)) {
										return false;
									}
								} else {
									if (!/^((\(\d{2,3}\))|(\d{3}\-))?(13|14|15|18)\d{9}$/
											.test(mobile)) {
										return false;
									}
								}
								return true;
							}
						});

		$.FormValid({
			formID : "#order-submit",
			vGroup : "2"
		});

		// 订单联系人信息 checkbox 选中填充信息
		$("input[name=order-person]")
				.live(
						"click",
						function() {
							$("#order-submit").parent("dd").find("span")
									.remove();
							// 所有的联系人文本框
							var $textPerson = $("input[name=text-order-person]");
							if ($(this).attr("checked") == "checked") { // 选中复选框
								$("input[name=order-person]").removeAttr(
										"checked");// 删除所有属性选中
								$(this).attr("checked", "checked"); // 给改属性增加选中
								var info = eval("("
										+ $(this).parent().attr("data-info")
										+ ")"), len = info.length, $div = $("#order-edit");

								if ($textPerson.siblings("i").hasClass(
										"order-ei")) {
									$textPerson.removeClass("order-error");
									$textPerson.siblings("i.order-ei").remove();
								}
								for ( var i in info) {
									if (i === "mobileNumber") {
										$div
												.find(
														"input[data-field=" + i
																+ "]").val(
														info[i]).attr("model",
														"super");
									} else {
										$div
												.find(
														"input[data-field=" + i
																+ "]").val(
														info[i]);
									}
								}
							} else {
								$("#order-edit").find(
										"input[name=text-order-person]")
										.val("");
							}

						});

		// 订单联系人信息修改
		$("#order-btn").live(
				"click",
				function() {
					$("#order-list").find("input[type=checkbox]").attr(
							"disabled", false);
					$("#order-edit").show();
					$("#order-info").hide();
					formSubmitValid[2].isValid = false;
					return false;
				});
	}());

	// 取票人信息
	(function() {

		var paperworkArr = {
			ID_CARD : "身份证",
			HUZHAO : "护照"
		};
		// 取票人信息验证绑定
		// 姓名验证
		$("#take-user").liteValid({
			vGroup : "3",
			valid : [ "empty", "reg" ],
			regExp : "userName",
			msg : [ "请输入取票人姓名", "姓名只能为中文或英文,长度为2-20字符" ]
		});
		// 手机验证
		$("#take-mobile")
				.liteValid(
						{
							valid : [ "empty", "customer" ],
							msg : [ "请输入手机号码", "请输入正确的手机号码" ],
							vGroup : "3",
							callback : function(o) {
								var mobile = $("#take-mobile").val();
								if ($.trim(mobile) == "") {
									return false;
								}
								var model = $("#take-mobile").attr("model");
								var bool = mobile.indexOf("****");

								if (model == "super" && bool !== -1) {
									if (!/^1[3458]{1,1}[0-9]{1,1}[\*]{4,4}[0-9]{4,4}$/
											.test(mobile)
											&& !/^1[0-9]{10,}$/.test(mobile)) {
										return false;
									}
								} else {

									if (!/^((\(\d{2,3}\))|(\d{3}\-))?(13|14|15|18)\d{9}$/
											.test(mobile)) {
										return false;
									}
								}
								return true;
							}
						});
		// 证件号码验证
		if ($("#take-cardNum").length > 0) {
			$("#take-cardNum").liteValid({
				vGroup : "3",
				valid : [ "empty", "reg" ],
				regExp : "idcard",
				msg : [ "请输入证件号码", "请输入正确的证件号码" ]
			});
		}

		$.FormValid({
			formID : "#take-submit",
			vGroup : "3"
		});

		// 取票人信息 checkbox 选中填充信息
		$("input[name=take-person]")
				.live(
						"click",
						function() {
							$("#take-submit").parent("dd").find("span")
									.remove();
							var $textPerson = $("input[name=text-take-person]");
							if ($(this).attr("checked") == "checked") {
								$("input[name=take-person]").removeAttr(
										"checked");
								$(this).attr("checked", "checked");
								var info = eval("("
										+ $(this).parent().attr("data-info")
										+ ")"), len = info.length, $div = $("#take-edit");

								if ($textPerson.siblings("i").hasClass(
										"order-ei")) {
									$textPerson.removeClass("order-error");
									$textPerson.siblings("i.order-ei").remove();
								}

								for ( var i in info) {
									if (i === "mobileNumber") {
										$div
												.find(
														"input[data-field=" + i
																+ "]").val(
														info[i]).attr("model",
														"super");
									} else {
										$div
												.find(
														"input[data-field=" + i
																+ "]").val(
														info[i]);
									}
								}
								$div.find("span.select-value").html(
										paperworkArr[info.cardType]);

							} else {
								$("#take-edit").find(
										"input[name=text-take-person]").val("");
							}

						});

		// 取票人信息修改
		$("#take-btn").live(
				"click",
				function() {
					$("#take-list").find("input[type=checkbox]").attr(
							"disabled", false);
					$("#take-edit").show();
					$("#take-info").hide();
					formSubmitValid[3].isValid = false;
					return false;
				});
	}());

	// 游玩人信息
	(function() {
		var $dl = $("#play-edit").find("dl"), lens = $dl.length - 1;

		// for (var k = 1; k <= lens; k++) {
		// if($dl.eq(k-1).find("input[data-field=receiverName]").length > 0){
		// $("#play-name" + k).liteValid({ vGroup: "4", valid: ["reg"], regExp:
		// "empty" });
		// }

		// if($dl.eq(k-1).find("input[data-field=mobileNumber]").length > 0){
		// $("#play-mobile" + k).liteValid({ vGroup: "4", valid: ["reg"],
		// regExp: "mobile" });
		// }
		// }

		$.FormValid({
			formID : "#play-submit",
			vGroup : "4"
		});

		var focusIndex = -1, paperworkArr = {
			ID_CARD : "身份证",
			HUZHAO : "护照"
		}, jl = {};

		$("input[names=text-play-person]").click(function() {
			focusIndex = $(this).parents("dl").index();
		});

		// 游玩人信息 checkbox 选中填充信息
		$("input[name=play-person]")
				.live(
						"click",
						function() {
							$("#play-submit").parent("dd").find("span")
									.remove();
							var info = eval("("
									+ $(this).parent().attr("data-info") + ")"), index = $(
									this).parent().index(), $dl = $(
									"#play-edit").find("dl"), $checkbox = $("input[name=play-person]");

							if ($(this).attr("checked")) {

								if (focusIndex !== -1) {

									for ( var k in jl) {
										if (jl[k] === focusIndex) {
											$("input[name=play-person]").eq(k)
													.attr("checked", false);
											delete jl[k];
										}
									}

									for ( var i in info) {
										$dl.eq(focusIndex).find(
												"input[data-field=" + i + "]")
												.val(info[i]);
									}
									$dl.eq(focusIndex)
											.find("span.select-value")
											.html(paperworkArr[info.cardType]);
									jl[index] = focusIndex;
									$dl.eq(focusIndex).attr("fill", "true");
									focusIndex = -1;
								} else {

									for ( var j = 0, l = $dl.length - 1; j < l; j++) {

										if (!$dl.eq(j).attr("fill")) {

											// 选中去除验证错误提示
											if ($dl.eq(j).find("input")
													.siblings("i").hasClass(
															"order-ei")) {
												$dl.eq(j).find("input")
														.removeClass(
																"order-error");
												$dl.eq(j).find("input")
														.siblings("i.order-ei")
														.remove();
											}

											for ( var i in info) {
												if (i === "mobileNumber") {
													$dl.eq(j).find(
															"input[data-field="
																	+ i + "]")
															.val(info[i]).attr(
																	"model",
																	"super");
												} else {
													$dl.eq(j).find(
															"input[data-field="
																	+ i + "]")
															.val(info[i]);
												}
											}

											$dl
													.eq(j)
													.find("span.select-value")
													.html(
															paperworkArr[info.cardType]);
											jl[index] = j;
											$dl.eq(j).attr("fill", "true");
											break;
										}
									}

								}

							} else {
								$dl.eq(jl[index]).find(
										"input[names=text-play-person]")
										.val("");
								$dl.eq(jl[index]).find("span.select-value")
										.html(paperworkArr.ID_CARD);
								$dl.eq(jl[index]).attr("fill", "");
								delete jl[index];
							}

							if ($dl.length - 1 == $(
									"input[name=play-person]:checked").size()) {
								$checkbox.attr("disabled", true);
								$("input[name=play-person]:checked").attr(
										"disabled", false);
							} else {
								$checkbox.attr("disabled", false);
							}

						});

		// 游玩人信息修改
		$("#play-btn").live(
				"click",
				function() {
					$("#play-list").find("input[type=checkbox]").attr(
							"disabled", false);
					$("#play-edit").show();
					$("#play-info").hide();
					formSubmitValid[4].isValid = false;
					return false;
				});
	}());

	// 紧急联系人
	(function() {

		// 紧急联系人信息验证绑定
		$("#em-user").liteValid({
			vGroup : "5",
			valid : [ "reg" ],
			regExp : "empty"
		});
		$("#em-mobile")
				.liteValid(
						{
							valid : [ "empty", "customer" ],
							msg : [ "请输入手机号码", "请输入正确的手机号码" ],
							vGroup : "5",
							callback : function(o) {
								var mobile = $("#em-mobile").val();
								if ($.trim(mobile) == "") {
									return false;
								}
								var model = $("#em-mobile").attr("model");

								var bool = mobile.indexOf("****");
								if (model == "super" && bool !== -1) {
									if (!/^1[3458]{1,1}[0-9]{1,1}[\*]{4,4}[0-9]{4,4}$/
											.test(mobile)
											&& !/^1[0-9]{10,}$/.test(mobile)) {
										return false;
									}
								} else {

									if (!/^((\(\d{2,3}\))|(\d{3}\-))?(13|14|15|18)\d{9}$/
											.test(mobile)) {
										return false;
									}
								}
								return true;
							}
						});

		$.FormValid({
			formID : "#em-submit",
			vGroup : "5"
		});

		// 紧急联系人信息 radio 选中填充信息
		$("input[name=em-person]")
				.live(
						"click",
						function() {
							$("#em-submit").parent("dd").find("span").remove();
							// 所有的em文本框
							var $emPerson = $("input[name=text-em-person]");
							if ($(this).attr("checked") == "checked") { // 选中复选框
								$("input[name=em-person]")
										.removeAttr("checked");// 删除所有属性选中
								$(this).attr("checked", "checked"); // 给改属性增加选中
								var info = eval("("
										+ $(this).parent().attr("data-info")
										+ ")"), len = info.length, $div = $("#em-edit");

								if ($emPerson.siblings("i")
										.hasClass("order-ei")) {
									$emPerson.removeClass("order-error");
									$emPerson.siblings("i.order-ei").remove();
								}

								for ( var i in info) {
									if (i === "mobileNumber") {
										$div
												.find(
														"input[data-field=" + i
																+ "]").val(
														info[i]).attr("model",
														"super");
									} else {
										$div
												.find(
														"input[data-field=" + i
																+ "]").val(
														info[i]);
									}
								}
							} else {
								$("#em-edit")
										.find("input[name=text-em-person]")
										.val("");
							}

						})
		// 紧急联系人信息修改
		$("#em-btn").live("click", function() {
			$("#em-list").find("input[type=checkbox]").attr("disabled", false);
			$("#em-edit").show();
			$("#em-info").hide();
			formSubmitValid[5].isValid = false;
			return false;
		});
	}());

	// 集合地
	$("input[name=address]").click(function() {
		$("#js-address").hide();
	})

	$(".JS_check").delegate(".check-radio-item", 'click', function() {
		var _thisbox = $(this).parents(".check-radio-box");
		_thisbox.toggleClass("selected");// .siblings(".check-radio-box").removeClass("selected").find(".check-radio-item").removeClass("active");
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
		} else {
			$(this).addClass("active");
		}

	});
	$(".JS_check").delegate(".check-content .tip-close", "click", function() {
		$(this).parents(".check-radio-box").find(".check-radio-item").click();
	});

	$(".slidedown-orderlist").click(
			function() {
				$(this).toggleClass("active").parent().find(".order-list")
						.toggleClass("hide");

			})

	$("b.countdown").ui("countdown", {
		timeauto : true,
		format : "dd:hh:mm:ss",
		overtips : "此订单已过期"
	});

	// pandora.OperNumber =

	$(".oper-numbox").delegate(".J_increase", "click", function() {
		// console.log($(this).prev().val());
		var _number = parseInt($(this).prev().val());
		_number < 99999999 && _number++;
		$(this).prev().val(_number);
	})
	$(".oper-numbox").delegate(".J_reduce", "click", function() {
		// console.log($(this).next().val());
		var _number = parseInt($(this).next().val());
		_number > 0 && _number--;
		$(this).next().val(_number);
	})

	$("body").ui("calendar", {
		input : ".date-birthday",
		parm : {
			dateFmt : 'yyyy-MM-dd'
		}
	})

	/* select模拟 */
	// $("body").delegate(".selectbox","click",(function(e){
	$(".selectbox").live("click", function(e) {
		var obj = e.target || e.srcElement;
		if (obj.className != "selectbox-drop") {
			$(this).toggleClass("selectbox-active active");
		}
	}).mouseleave(function() {
		var e = this;
		e.timeId = setTimeout(function() {
			$(e).removeClass("selectbox-active active");
		}, 200)
	}).mouseenter(function() {
		clearTimeout(this.timeId)
	})

	$("div.selectbox-drop").delegate(
			"[data-value]",
			"click",
			function() {
				// div.selectbox
				var _selectbox = $(this).parents(".selectbox");
				// 删除默认的
				_selectbox.find("[data-value]").removeClass("selected");
				// li中 选中的
				$(this).addClass("selected")
				// <span value="ID_CARD" class="select-value">选中的值</span>
				_selectbox.find(".select-value").attr("value",
						$(this).attr("data-value")).text($(this).text())
				// $(this).parents("dd").find("span[calss=select-value]").attr("value",$(this).attr("data-value"));
				$(this).parents("dd").find("input[names=text-play-person]").eq(
						1).attr("value", $(this).attr("data-value"));

				if ($(this).parents(".selectbox").hasClass("certtype")) {
					if ($(this).text() == "台湾通行证") {
						$(this).parents(".xdl").find(".form-more").removeClass(
								"hide");
					} else {
						$(this).parents(".xdl").find(".form-more").addClass(
								"hide");
					}
				}
			});

	// $("div.selectbox-drop").live()

	/* 复选中后显示数量操作 */
	$('.input-checkbox').live("click", function() {
		// console.log(!!$(this).attr("checked"));
		var _thatNum = $(this).parents(".check-text").find(".selectbox");
		if (!!$(this).attr("checked") && _thatNum) {
			_thatNum.removeClass("hide");
		} else {
			_thatNum.addClass("hide");
		}
	})
	/* 单选中后显示数量操作 */
	$('.input-radio').live(
			"click",
			function() {
				// console.log(!!$(this).attr("checked"));
				var _thisbox = $(this).parents(".JS_check").find(".selectbox");
				var _thatNum = $(this).parents(".check-text")
						.find(".selectbox");
				if (!!$(this).attr("checked")) {
					_thisbox.addClass("hide");
					_thatNum.removeClass("hide");
					// $(this).parents(".check-radio-box").siblings().find(".check-content").hide();
					// console.log($(this).hasClass("no-check"));
					if ($(this).hasClass("no-check")) {
						$(this).parents(".check-radio-box").find(
								".no-check-content").show();
					} else {
						$(this).parents(".check-radio-box").siblings(
								".check-radio-box").find(".no-check-content")
								.hide();
					}

				} else {
					_thatNum.addClass("hide");

				}

				// if(!!$("input.no-check").attr("checked")){
				// $(this).parents(".check-radio-box").find(".check-content").removeClass("hide");
				// }

			})

	$.fn.smartFloat = function() {
		var position = function(element) {
			var top = element.position().top, pos = element.css("position");
			$(window).scroll(function() {
				var scrolls = $(this).scrollTop();
				if (scrolls > top) {
					if (window.XMLHttpRequest) {
						element.css({
							position : "fixed",
							top : 0
						});
					} else {
						element.css({
							top : scrolls
						});
					}
				} else {
					element.css({
						position : "absolute",
						top : top
					});
				}
			});
		};
		return $(this).each(function() {
			position($(this));
		});
	};

	// 绑定
	$(".side-setbox").smartFloat();

})

$(function() {
	/* 添加/删除 乘客 */
	var additembox = $(".passenger-box");
	var currentItem;
	additembox.delegate(".xdl", "mouseenter", function() {
		currentItem = this;
	});

	additembox.delegate(".remove-this", "click", function() {
		if ($(currentItem).siblings(".xdl").length == 0) {
			return;
		}
		$(currentItem).fadeOut(300, function() {
			$(this).remove();
			$("i.passenger-num").each(function(i, n) {
				$(this).html(i + 1);
			});
		});
	});
	$("a.add-item").click(function() {
		var obj = $("#itemTemplete").find(".xdl").clone(true);
		if (additembox.find(".xdl").length > 4) {
			$.msg("每个人预订票数不能超过5张！");
			return;
		}
		additembox.append(obj);
		obj.hide().fadeIn(300);
		$("i.passenger-num").each(function(i, n) {
			$(this).html(i + 1);
		});

		$("body").ui("calendar", {
			input : ".date-birthday",
			parm : {
				dateFmt : 'yyyy-MM-dd'
			}
		})

		return false;
	});
})