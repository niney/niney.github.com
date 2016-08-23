/*
 * angular-ui-cool-module
 * 

 * Version: 0.0.1 - 2016-08-23
 * License: MIT
 */angular.module("ui.cool", ["ui.cool.tpls", "ui.cool.age","ui.cool.alert","ui.cool.dateHelper","ui.cool.messageList","ui.cool.test"]);
angular.module("ui.cool.tpls", ["ui/template/alert/alert.html","ui/template/messageList/messageList.html","ui/template/messageList/tableList.html"]);
angular.module('ui.cool.age', [])
    .filter('age', function (dateHelper) {
        return function (birthday, format) {
            // if(!!birthday) {
            //     var ageDifMs = Date.now() - new Date(birthday);
            //     var ageDate = new Date(ageDifMs); // miliseconds from epoch
            //     var age = Math.abs(ageDate.getUTCFullYear() - 1970);
            //     return format.replace("xx", age);
            // }
            var age = dateHelper.birthDayToAge(birthday);
            return format.replace("xx", age);
        };
    })
;
angular.module('ui.cool.alert', [])
    .controller('CoolAlertCtrl', function($scope, $element, $attrs, $interpolate, $timeout) {
        $scope.closeable = !!$attrs.close;
        $element.addClass('alert');
        $attrs.$set('role', 'alert');
        if ($scope.closeable) {
            $element.addClass('alert-dismissible');
        }

        var dismissOnTimeout = angular.isDefined($attrs.dismissOnTimeout) ?
            $interpolate($attrs.dismissOnTimeout)($scope.$parent) : null;

        if (dismissOnTimeout) {
            $timeout(function() {
                $scope.close();
            }, parseInt(dismissOnTimeout, 10));
        }
    })
    .directive('coolAlert', function() {
        return {
            controller: 'CoolAlertCtrl',
            controllerAs: 'alert',
            restrict: 'A',
            templateUrl: function(element, attrs) {
                return attrs.templateUrl || 'ui/template/alert/alert.html';
            },
            transclude: true,
            scope: {
                close: '&'
            }
        };
    })
;
angular.module('ui.cool.dateHelper', [])
    .service('dateHelper', function() {
        return {
            birthDayToAge: function (birthday) {
                if(birthday !== undefined) {
                    var ageDifMs = Date.now() - new Date(birthday);
                    var ageDate = new Date(ageDifMs); // miliseconds from epoch
                    return Math.abs(ageDate.getUTCFullYear() - 1970);
                }
                return -1;
            }
        };
    })
;
angular.module('ui.cool.messageList', [])
    .component('coolMessageList', {
        bindings: {
            list: '=',
            onTitleClick: '=',
            draggable: '='
        },
        controller: function ($element, $attrs) {
            this.showContent = function(m) {
                if(this.onTitleClick) {
                    this.onTitleClick(m);
                } else {
                    this.showObj = m;
                }
            };

            this.$postLink = function() {
                if($attrs.draggable === "true") {
                    $element.draggable();
                }
            };

        },
        templateUrl:  function (/*$element, $attrs*/) {
            return 'ui/template/messageList/messageList.html';
        }
    })
;
angular.module('ui.cool.test', [])
    .service('tester', function() {
        return {
            birthDayToAge: function (birthday) {
                if(birthday !== undefined) {
                    var ageDifMs = Date.now() - new Date(birthday);
                    var ageDate = new Date(ageDifMs); // miliseconds from epoch
                    return Math.abs(ageDate.getUTCFullYear() - 1970);
                }
                return -1;
            }
        };
    })
;
angular.module("ui/template/alert/alert.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ui/template/alert/alert.html",
    "<button ng-show=\"closeable\" type=\"button\" class=\"close\" ng-click=\"close({$event: $event})\">\n" +
    "  <span aria-hidden=\"true\">&times;</span>\n" +
    "  <span class=\"sr-only\">Close</span>\n" +
    "</button>\n" +
    "<div ng-transclude></div>\n" +
    "");
}]);

angular.module("ui/template/messageList/messageList.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ui/template/messageList/messageList.html",
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">보낸메시지</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <table class=\"table table-hover\">\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "                <th>제목</th>\n" +
    "                <th>보낸이</th>\n" +
    "                <th>받는이</th>\n" +
    "                <th>보낸날짜</th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <tr ng-click=\"$ctrl.showContent(m)\" ng-repeat-start=\"m in $ctrl.list\">\n" +
    "                <td>{{m.title}}</td>\n" +
    "                <td>{{m.sender.name}}</td>\n" +
    "                <td>{{m.receiver.name}}</td>\n" +
    "                <td>{{m.dateCreated}}</td>\n" +
    "            </tr>\n" +
    "            <tr class=\"info\" ng-if=\"$ctrl.showObj == m\" ng-repeat-end>\n" +
    "                <td colspan=\"4\">&nbsp;&nbsp;&nbsp;&nbsp;{{$ctrl.showObj.content}}</td>\n" +
    "            </tr>\n" +
    "\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("ui/template/messageList/tableList.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ui/template/messageList/tableList.html",
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">보낸메시지</div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <table class=\"table table-hover\">\n" +
    "            <thead>\n" +
    "            <tr>\n" +
    "                <th>제목</th>\n" +
    "                <th>보낸이</th>\n" +
    "                <th>받는이</th>\n" +
    "                <th>보낸날짜</th>\n" +
    "            </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "            <ng-transclude>\n" +
    "            </ng-transclude>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
angular.module('ui.cool.alert').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uibAlertCss && angular.element(document).find('head').prepend('<style type="text/css">.alert{padding:15px;margin-bottom:20px;border:1px solid transparent;border-radius:4px;}.alert h4{margin-top:0;color:inherit;}.alert .alert-link{font-weight:bold;}.alert > p,.alert > ul{margin-bottom:0;}.alert > p + p{margin-top:5px;}.alert-dismissable,.alert-dismissible{padding-right:35px;}.alert-dismissable .close,.alert-dismissible .close{position:relative;top:-2px;right:-21px;color:inherit;}.alert-success{color:#3c763d;background-color:#dff0d8;border-color:#d6e9c6;}.alert-success hr{border-top-color:#c9e2b3;}.alert-success .alert-link{color:#2b542c;}.alert-info{color:#31708f;background-color:#d9edf7;border-color:#bce8f1;}.alert-info hr{border-top-color:#a6e1ec;}.alert-info .alert-link{color:#245269;}.alert-warning{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc;}.alert-warning hr{border-top-color:#f7e1b5;}.alert-warning .alert-link{color:#66512c;}.alert-danger{color:#a94442;background-color:#f2dede;border-color:#ebccd1;}.alert-danger hr{border-top-color:#e4b9c0;}.alert-danger .alert-link{color:#843534;}</style>'); angular.$$uibAlertCss = true; });