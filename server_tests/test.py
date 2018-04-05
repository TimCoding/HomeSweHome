import unittest

import server.geo as geo
import server.scraper as scraper
import server.api as api


class TestGeoMethods(unittest.TestCase):

    def test_zip_locs(self):
        texas_zip = 75001
        self.assertIn(texas_zip, geo.zip_locs)
        zip_loc = geo.zip_locs[texas_zip]
        self.assertAlmostEqual(zip_loc[0], 32.96129, places=7)
        self.assertAlmostEqual(zip_loc[1], -96.83751, places=7)

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
        self.assertAlmostEqual(geo.get_zip_distance(75001, 75002), 24.66684714757283)

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
            [75001, 75066, 75287, 75244, 75254, 75248]
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


class TestScraperMethods(unittest.TestCase):

    def test_unique_queue(self):
        uq = scraper.UniqueQueue()
        self.assertTrue(uq.empty())
        uq.put(1)
        self.assertFalse(uq.empty())
        uq.put(2)
        uq.put(1)
        uq.put(3)
        self.assertEqual(uq.get(), 1)
        self.assertEqual(uq.get(), 2)
        self.assertEqual(uq.get(), 3)
        self.assertTrue(uq.empty())
        uq.put(2)
        self.assertTrue(uq.empty())


class TestApiMethods(unittest.TestCase):

    def test_retry_once(self):
        times_called = [0]

        @api.retry_once
        def func1():
            times_called[0] += 1

        func1()
        self.assertEqual(times_called[0], 1)

        times_called = [0]

        @api.retry_once
        def func2():
            times_called[0] += 1
            raise Exception("TESTING - If this is being thrown in a test, do not worry. This is intentional.")

        with self.assertRaises(Exception):
            func2()

        self.assertEqual(times_called[0], 2)

    def test_convert_error_response(self):
        @api.convert_error_response
        def func1():
            return 123

        self.assertEqual(func1(), 123)

        @api.convert_error_response
        def func2():
            raise Exception("TESTING - IGNORE")

        with self.assertRaises(Exception):
            func2()

        @api.convert_error_response
        def func3():
            raise api.ResponseError("TESTING", "response")

        self.assertEqual(func3(), "response")


if __name__ == "__main__":
    unittest.main()

