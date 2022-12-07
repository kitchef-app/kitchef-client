const extraPay = {
	range1: 3000,
	range2:  6000,
	nightShift: 3000 
}

export const calculateOngkir = (distance) => {
    distance = Math.abs(distance)
    const pricePerKm = 2500
    if (distance < 8) {
        return 20000
    } else {
        const extraDistance = distance <= 20 ? extraPay.range1 : extraPay.range2
        const timeNow = (new Date()).getHours()
        const extraNightShift = timeNow <= 5 || timeNow == 23 ? extraPay.nightShift : 0
        return distance * pricePerKm + extraDistance + extraNightShift
    }
}