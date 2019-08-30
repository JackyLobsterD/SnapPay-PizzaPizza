import moment from 'moment';

const westminsterA1 = [[49.2135164, -122.9378256], [49.20768496, -122.9307017], [49.19865609, -122.9492411], [49.19618829, -122.9466233], [49.21173298, -122.9186303], [49.21896552, -122.9276425]];
const westminsterA2 = [[49.19606729, -122.9467131], [49.19859118, -122.939632], [49.19679643, -122.9162432], [49.20139012, -122.9052159], [49.21179223, -122.9186055]];
const westminsterB1 = [[49.21890945, -122.9276355], [49.21167691, -122.9186662], [49.21821714, -122.9067691], [49.22536464, -122.9158242]];
const westminsterB2 = [[49.2117642, -122.9187343], [49.20127796, -122.9050014], [49.20890454, -122.8942725], [49.21832398, -122.9068467]];
const westminsterC1 = [[49.22536114, -122.9158936], [49.21880229, -122.9073106], [49.22496875, -122.8955518], [49.23186306, -122.9038344]];
const westminsterC2 = [[49.21841802, -122.906945], [49.209307, -122.8947141], [49.22496067, -122.8956637], [49.21890633, -122.888926]];
const westminsterD1 = [[49.23180702, -122.9038215], [49.22502481, -122.8958392], [49.23469338, -122.8782221], [49.23469338, -122.8782221], [49.23469338, -122.8782221], [49.23828007, -122.8859898]];
const westminsterD2 = [[49.2250262, -122.8958067], [49.21972871, -122.8893694], [49.23464584, -122.8784849], [49.23077863, -122.8715755], [49.22466895, -122.870803]];
const westminsterArray = [westminsterA1, westminsterA2, westminsterB1, westminsterB2, westminsterC1, westminsterC2, westminsterD1, westminsterD2];


export const geoPolygon = {
  surreyArray: [[49.02668312, -122.8344321], [49.06879746, -122.8343196], [49.07023136, -122.827539], [49.07505373, -122.822586], [49.07471167, -122.779141], [49.0408184, -122.779531], [49.01568869, -122.7571589], [49.01591386, -122.7937227], [49.02047331, -122.8086573], [49.0222941, -122.8342555]],
  burnabyArray: [[49.29270678, -123.0261679], [49.2761344, -123.0316611], [49.26258088, -123.025482], [49.26192573, -122.9812667], [49.27909841, -122.9810092], [49.27923839, -122.9747007], [49.29025547, -122.9744861], [49.29525882, -122.9876114], [49.29075259, -123.0025889]],
  westminsterArray,
  multiplier: 10000000,
  key: 'AIzaSyCuNeDQfFowGcMhp3CeE5LxYN6eR5XjqTE',
};

export const isOpen= ()=> {
  const openTime = (time: string, now: any) => {
    let open = false;
    const combine = time.split('-');
    const opening_time = moment(combine[0], 'hh:mm:ss');
    const closing_time = moment(combine[1], 'hh:mm:ss');
    if (opening_time.isValid() && closing_time.isValid()) {
      if (now.isBetween(opening_time, closing_time)) {
        open = true;
      }
    }
    return open;
  };
  let open = false;
  const now = moment();
  const dow = now.day();
  if (dow === 0 || dow === 6) {
    open = openTime('11.00-24.00', now) || openTime('00.00-2.00', now);
  } else if (dow > 0 || dow < 6) {
    open = openTime('11.00-23.59', now);
  }
  return open;
};