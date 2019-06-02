const Util = {

    intToDollarsText(val) {
        if (val) {
            return '$' + val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.00', '');
        }
    },

    compareGross(a, b) {
        if (a.gross < b.gross) {
            return -1;
        }
        if (a.gross > b.gross) {
            return 1;
        }
        return 0;
    }

}

export default Util;