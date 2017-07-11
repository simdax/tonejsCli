export default function (n) {
	var res = n % 7
	if (res < 0) { res += 7 }
	return res
}
