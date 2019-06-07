import Vue from 'vue';
import Moment from 'moment';

Vue.filter('filterDate', function(value, formatStr = 'YYYY-MM-DD HH:mm:ss') {
  return Moment(value).format(formatStr);
});
