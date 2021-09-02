
import CityModel from '../model/city.js'
// Get all cities with sort, filter, searching, pagination
export const getCities = async (req, res) => {
    try {
        const clientQuery = req.query;
        const sortType = parseInt(clientQuery.sortType) || -1;
        const sortBy = clientQuery.sortBy || 'pop';
        const limit = parseInt(clientQuery.limit) || 50;
        const pageNo = parseInt(clientQuery.pageNo) || 0;
        const skip = ((pageNo) * limit);

        let sortQuery = {};
        if (sortBy && sortType) {
            sortQuery[sortBy] = sortType;
        }

        let filterQuery = {};
        console.log('clientQuery.stateSelectedList.split(",").filter(n => n).length ', clientQuery.stateSelectedList.split(",").filter(n => n).length)
        if (clientQuery.stateSelectedList.split(",").filter(n => n).length) {
            filterQuery.state = { $in: clientQuery.stateSelectedList.split(",").filter(n => n) };
        }
        if (clientQuery.citySelectedList.split(",").filter(n => n).length) {
            filterQuery.city = { $in: clientQuery.citySelectedList.split(",").filter(n => n) };
        }
        if (clientQuery.searchString) {
            filterQuery.$or = [{ city: { $regex: clientQuery.searchString, $options: 'i' } }, { state: { $regex: clientQuery.searchString, $options: 'i' } }]
        }
        const [filterColumnData, count, citiesData] = await Promise.all([
            CityModel.aggregate([
                {
                    "$group": {
                        "_id": false,
                        "state": { "$addToSet": "$state" },
                        "city": { "$addToSet": "$city" }
                    }
                }

            ]),
            CityModel.count(filterQuery),
            CityModel.find(filterQuery).sort(sortQuery).skip(skip).limit(limit)
        ])
        let filterData = { state: [], city: [] }
        if (filterColumnData.length) { filterData.state = filterColumnData[0]['state']; filterData.city = filterColumnData[0]['city'] }
        return res.status(200).json({ successMsg: 'Cities successfully fetched!', total: count, limit, data: { citiesData, filterData } });
    } catch (error) {
        return res.status(500).send(error);
    }
}
// Get cities having max/min population with count
export const getCitiesWithMaxPopulation = async (req, res) => {
    try {
        const clientQuery = req.query;
        const count = parseInt(clientQuery.fetchCount) || 10;
        const sortOrder = parseInt(clientQuery.sortBy) || -1;

        const citiesData = await CityModel.find({}).sort({ pop: sortOrder }).limit(count);

        return res.status(200).json({ successMsg: 'Cities successfully fetched!', total: citiesData.length, data: citiesData });
    } catch (error) {
        return res.status(500).send(error);
    }
}

export default { getCities }