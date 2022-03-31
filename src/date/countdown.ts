/**
 * 倒计时
 * @param {Date} date
 * @param {Number} timer
 */
export function countdown (date: Date, timer: NodeJS.Timeout | null) {
	var time = (date.getTime() - Date.now()) / 1000,
			day = 0,
			hours = 0,
			minutes = 0,
			seconds = 0;

  if (time > 0) {
    day = Math.floor(time / 60 / 60 / 24),
		hours = Math.floor(time / 60 / 60 % 24),
		minutes = Math.floor(time / 60 % 60),
		seconds = Math.floor(time % 60);
  } else {
    clearTimeout(timer!);
    timer = null;
	}

	return {
		day: day,
		hours: hours,
		minutes: minutes,
		seconds: seconds,
		countdown: '\
			' + day + '天 \
			' + hours + '小时 \
			' + minutes + '分钟 \
			' + seconds + ' 秒\
		'
	}
}
