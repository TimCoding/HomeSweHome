import unittest

import server.geo as geo


class TestGeoMethods(unittest.TestCase):

    def test_zip_locs(self):
        texas_zip = 75001
        self.assertIn(texas_zip, geo.zip_locs)
        zip_loc = geo.zip_locs[texas_zip]
        self.assertAlmostEqual(zip_loc[0], 32.960047, places=10)
        self.assertAlmostEqual(zip_loc[1], -96.838522, places=10)

    def test_haversine(self):
        self.assertAlmostEqual(
            geo.haversine((0.0, 0.0), (0.0, 0.0)),
            0.0
        )
        self.assertAlmostEqual(
            geo.haversine((32.960047, -96.838522), (33.089854, -96.6086)),
            25.842170688060058
        )

    def test_zip_distance(self):
        self.assertAlmostEqual(geo.get_zip_distance(77379, 77379), 0.0)
        self.assertAlmostEqual(geo.get_zip_distance(75001, 75002), 25.842170688060058)

    def test_zip_distance_comparator(self):
        source = 75001
        comparator = geo.get_zip_distance_comparator(source)
        for zip_loc in geo.zip_locs:
            self.assertLessEqual(comparator(source, zip_loc), 0.0)
        self.assertGreater(comparator(75002, 75006), 0.0)

    def test_order_zips(self):
        source = 75001
        zips = geo.order_zips(source)
        comparator = geo.get_zip_distance_comparator(source)
        self.assertEqual(zips[0], source)
        for i in range(1, len(zips)):
            self.assertLessEqual(comparator(zips[i - 1], zips[i]), 0.0)

    def test_zips_in_radius(self):
        source = 75001
        self.assertListEqual(
            geo.zips_in_radius(source, 0.0),
            [source]
        )
        self.assertListEqual(
            geo.zips_in_radius(source, 5.0),
            [75001, 75244, 75248, 75254, 75287]
        )
        all_zips = set(geo.zip_locs.keys())
        u_zips = set(geo.zips_in_radius(source, 9999.0))
        self.assertSetEqual(u_zips, all_zips)

    def get_closest_zip(self):
        lat = 32.960047
        lon = -96.838522
        self.assertEqual(
            geo.get_closest_zip((lat, lon)),
            75001
        )
        self.assertEqual(
            geo.get_closest_zip((lat + 0.0005, lon + 0.0005)),
            75001
        )


if __name__ == "__main__":
    unittest.main()

