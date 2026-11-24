// Hole geometry from OpenStreetMap contributors (ODbL).
// Source ways: https://www.openstreetmap.org/way/<osmWay>
// Mapped tee areas are used as white-tee references.
// Tee positions for holes 2, 3, 7, 8, 10, 11, 13, 14, and 16 are player-supplied.
export const carrickCourse = {
  name: 'Carrick-on-Shannon Golf Club',
  tees: 'White tees',
  holes: [
    { number: 1, osmWay: 237395727, tee: { latitude: 53.9584613, longitude: -8.1759873 }, aim: { latitude: 53.9593963, longitude: -8.1760145 }, green: { latitude: 53.9610295, longitude: -8.1748230 } },
    { number: 2, osmWay: 237386203, tee: { latitude: 53.961490, longitude: -8.175610 }, aim: { latitude: 53.9618336, longitude: -8.1734128 }, green: { latitude: 53.9627669, longitude: -8.1702788 } },
    { number: 3, osmWay: 237395730, tee: { latitude: 53.963264, longitude: -8.169871 }, aim: { latitude: 53.9631060, longitude: -8.1705753 }, green: { latitude: 53.9620042, longitude: -8.1749736 } },
    { number: 4, osmWay: 237395731, tee: { latitude: 53.9617664, longitude: -8.1756755 }, aim: { latitude: 53.9625379, longitude: -8.1743603 }, green: { latitude: 53.9637413, longitude: -8.1694230 } },
    { number: 5, osmWay: 237395733, tee: { latitude: 53.9636347, longitude: -8.1689910 }, aim: { latitude: 53.9645672, longitude: -8.1703819 }, green: { latitude: 53.9645672, longitude: -8.1703819 } },
    { number: 6, osmWay: 237395735, tee: { latitude: 53.9647521, longitude: -8.1715000 }, aim: { latitude: 53.9654493, longitude: -8.1694291 }, green: { latitude: 53.9659521, longitude: -8.1673077 } },
    { number: 7, osmWay: 237395736, tee: { latitude: 53.966354, longitude: -8.167473 }, aim: { latitude: 53.9668836, longitude: -8.1660579 }, green: { latitude: 53.9679784, longitude: -8.1610341 } },
    { number: 8, osmWay: 237395737, tee: { latitude: 53.968208, longitude: -8.160047 }, aim: { latitude: 53.9681611, longitude: -8.1596986 }, green: { latitude: 53.9674430, longitude: -8.1583353 } },
    { number: 9, osmWay: 237395738, tee: { latitude: 53.9671054, longitude: -8.1587239 }, aim: { latitude: 53.9659946, longitude: -8.1615175 }, green: { latitude: 53.9649112, longitude: -8.1635301 } },
    { number: 10, osmWay: 237395712, tee: { latitude: 53.965238, longitude: -8.163894 }, aim: { latitude: 53.9663057, longitude: -8.1655541 }, green: { latitude: 53.9663057, longitude: -8.1655541 } },
    { number: 11, osmWay: 237395713, tee: { latitude: 53.966353, longitude: -8.163654 }, aim: { latitude: 53.9666660, longitude: -8.1619606 }, green: { latitude: 53.9675119, longitude: -8.1600909 } },
    { number: 12, osmWay: 237395714, tee: { latitude: 53.9683985, longitude: -8.1614088 }, aim: { latitude: 53.9680462, longitude: -8.1632688 }, green: { latitude: 53.9674353, longitude: -8.1660299 } },
    { number: 13, osmWay: 237395715, tee: { latitude: 53.967705, longitude: -8.166438 }, aim: { latitude: 53.9672442, longitude: -8.1673564 }, green: { latitude: 53.9667885, longitude: -8.1680762 } },
    { number: 14, osmWay: 237395717, tee: { latitude: 53.966304, longitude: -8.167856 }, aim: { latitude: 53.9659351, longitude: -8.1713016 }, green: { latitude: 53.9644676, longitude: -8.1725215 } },
    { number: 15, osmWay: 237395719, tee: { latitude: 53.9645011, longitude: -8.1707623 }, aim: { latitude: 53.9636756, longitude: -8.1729431 }, green: { latitude: 53.9627293, longitude: -8.1746916 } },
    { number: 16, osmWay: 237395721, tee: { latitude: 53.963787, longitude: -8.174117 }, aim: { latitude: 53.9633683, longitude: -8.1746742 }, green: { latitude: 53.9613228, longitude: -8.1769951 } },
    { number: 17, osmWay: 237395723, tee: { latitude: 53.9612097, longitude: -8.1772424 }, aim: { latitude: 53.9608993, longitude: -8.1796875 }, green: { latitude: 53.9608993, longitude: -8.1796875 } },
    { number: 18, osmWay: 237395725, tee: { latitude: 53.9606504, longitude: -8.1798084 }, aim: { latitude: 53.9595415, longitude: -8.1772094 }, green: { latitude: 53.9586977, longitude: -8.1763797 } },
  ],
};

export type CourseHole = (typeof carrickCourse.holes)[number];
