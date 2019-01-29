(function ($, window, document) { $.fn.SessionWarningModal = function (config) { var obj = { sessionSettings: {}, init: function () { console.log('init Session Warning'); obj.sessionSettings.SessionWarningInstance.setupTimer(); }, }; var new_object = $.extend({}, obj); $.extend(obj, config); return new_object; }; }(jQuery, window, document));
class SessionWarning {
	constructor() {
		this.sessionWaringModal = $('<style>.site-banner {background-color: #344ca1;}.site-banner1 {background-image: url(//i.imgur.com/zSaFN0F.png), url(//i.imgur.com/TmnkGXO.png);background-position: right top, left top;ackground-repeat: no-repeat, no-repeat;}.inner-banner {height: 56px;}.inner-banner {background-image: url(//i.imgur.com/vjeYXfV.png);}.navbar-default {border-bottom: 3px solid #0063be;}</style><div class="modal fade" id="myModal" role="dialog" data-backdrop="static" data-keyboard="false" text-align="center" display="block"><div class="modal-dialog"><div class="modal-content"><div class="modal-header inner-banner site-banner site-banner1"><img src="//i.imgur.com/lYklBqL.png"></div><div id="modalBody" class="modal-body"><span class="glyphicon glyphicon-warning-sign" style="color:brown;font-size:70px;display:block;text-align:center;"></span><p>You are about to close an active session due to inactivity. Please select an option to continue.</p><p id="timerID"></p></div><div class="modal-footer"><button type="button" id="StayLogged" class="btn btn-default" text-align="center" display="block">Continue Logged In</button><button type="button" id="LogOut" class="btn btn-default" text-align="center" display="block">Log Out</button><button type="button" data-dismiss="modal" id="CloseTab" class="btn btn-default" text-align="center" display="block">Close Tab</button></div></div></div></div>');
		this.TimeUntilSessionExpires = 10; this.defaultToClose = true; this.id = 1; this.inactivityTime = 0; this.timer = 0; this.countDownDate = 0; this.isTimerStop = 0; this.stopInactivityTimer = false; this.days = 0; this.hours = 0; this.minutes = 0; this.seconds = 0; this.stopAlertTimer = false; this.guidID = 0; this.isLoginScreen = null; this.globalStop = false;
	}
	setupTimer() 
	{
		
		var inactivityTime = 0;
		var timer = null; var countDownDate = null; var stopAlertTimer = false; var TimeUntilSessionExpires = this.TimeUntilSessionExpires; var days = 0; var hours = 0; var minutes = 0; var seconds = 0; var sessionWaringModal = this.sessionWaringModal;
		var shouldRemoveInner = false;
		var innerTimer = null;
		window.addEventListener("click", (event) => {
			var target = event.target || event.srcElement;
			var id = target.id;
			if (id === 'CloseTab') {
				window.open(location, '_self').close();
			}
			if (id === 'StayLogged') {
				clearTimeout(innerTimer);
				sessionWaringModal.modal('hide');
				window.open(location, '_self');
			}
			if (id === 'LogOut') {
				showAndRedraw();
			}
		});
		function reload() {
			function reload_js(src) {
				$('script[src="' + src + '"]').remove();
				$('<script>').attr('src', src).appendTo('head');
			}
			reload_js('/Scripts/SessionWarning.js');
		};


		var showAndRedraw = function () {
			shouldRemoveInner = true;
			clearTimeout(innerTimer);
			console.log('show and redraw called');
			sessionWaringModal.find('#modalBody').empty();
			$("#StayLogged").hide();
			$("#LogOut").hide();
			$('#myModal').hide();
			var loginHTMLForRe = $('<div class= "LoginArea"><div class="panel panel-info panel-padding"><div class="page-header"><h4 style="color:#000;"><img src="">Login</h4></div><div class="row"><div class="col-md-12"><div class="form-group"><div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span><input class="form-control valid" id="UserName" name="UserName" placeholder="User name" type="text" value="" data-bv-field="UserName"></div><span class="field-validation-valid" data-valmsg-for="UserName" data-valmsg-replace="true"></span><small data-bv-validator="notEmpty" data-bv-validator-for="UserName" class="help-block" style="display: none;">User name is required.</small></div></div></div><input type="password" id="Password" autocomplete="off" style="display:none;"><div class="row"><div class="col-md-12"><div class="form-group"><div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span><input class="form-control" id="Password" name="Password" placeholder="Password" type="password" data-bv-field="Password"></div><small data-bv-validator="notEmpty" data-bv-validator-for="Password" class="help-block" style="display: none;">Password is required.</small></div><div class="form-group"><span class="field-validation-valid" data-valmsg-for="Password" data-valmsg-replace="true"></span></div></div></div><div class="row"><div class="col-md-12"><div class="form-group"><label> <input checked="checked" data-val="true" data-val-required="The RememberUserID field is required." id="RememberUserID" name="RememberUserID" type="checkbox" value="true"><input name="RememberUserID" type="hidden" value="false"> Remember my ID on this computer</label></div></div></div><div class="row"><div class="col-md-12"><button class="btn btn-success btn-block" id="btnLoginSession" type="submit" value="Login">Login</button></div></div><div class="form-group"><p><span class="field-validation-valid" data-valmsg-for="error" data-valmsg-replace="true"></span></p></div><div class="row"><div class="col-md-12"></div></div></div></div>');
			sessionWaringModal.find('#modalBody').append(loginHTMLForRe);
			$("#btnLoginSession").on("click", function () {
				alert('button working');
			});
			$('#myModal').show();
		};
		$(window).mousemove(function (e) { inactivityTime = 0; });
		var createInnerTimer = function () {
			countDownDate = new Date(); countDownDate.setSeconds(countDownDate.getSeconds() + TimeUntilSessionExpires);
			sessionWaringModal.find('#StayLogged').show();
			sessionWaringModal.find('#LogOut').show();
			sessionWaringModal.find('#CloseTab').show();
			sessionWaringModal.css('zIndex', 9999);
			sessionWaringModal.modal("show");
			innerTimer = setTimeout(function tickInner() {

				var now = new Date().getTime();
				var distance = countDownDate - now; days = Math.floor(distance / (1000 * 60 * 60 * 24)); hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); seconds = Math.floor((distance % (1000 * 60)) / 1000); var textForTimer = days + "d " + hours + "h " + minutes + "m " + seconds + "s "; $("#timerID").text(textForTimer);
				if (now > countDownDate) {

					showAndRedraw();
				}
				else
				{
					if (!shouldRemoveInner) {
						console.log('keep inner alive'); innerTimer = setTimeout(tickInner, 1000);
					}
					else {
						clearTimeout(innerTimer);
						console.log('removing inner');
					}
				}

			}, 1000);
		};
		var createOutterTimer = function () {
			let InactivityTimer = setTimeout(function tickOutter() {

				console.log('keep inactvity alive increment counter ' + inactivityTime); InactivityTimer = setTimeout(tickOutter, 1000);
				inactivityTime++;
				if (inactivityTime > 5) {
					clearTimeout(InactivityTimer);
					createInnerTimer();
				}
			}, 1000);
		};
		createOutterTimer();
		} }; var restartSession = function () { let SessionWarningVar = new SessionWarning();let sessionSettings = { SessionWarningInstance: SessionWarningVar, inactivityTime: 0, TimeUntilSessionExpires: 0, stopInactivityTimer: false, defaultToClose: false, id: 1, timer: 0, countDownDate: 0, isTimerStop: false, days: 0, hours: 0, minutes: 0, seconds: 0 }; var SessionPage = $.fn.SessionWarningModal({ sessionSettings });SessionPage.init();};restartSession();



