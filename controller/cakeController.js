const asyncHandler = require("express-async-handler");
const Cake = require("../model/cake");

const getSpecificCake = asyncHandler(async (req, res, next) => {
  const cakes = await Cake.findById(req.params.id);
  if (cakes.length === 0) {
    res.status(404);
    throw new Error("Dont have any cake!");
  }
  res.status(200).json(cakes);
});

const getAllCake = asyncHandler(async (req, res, next) => {
  const cakes = await Cake.find();
  if (cakes.length === 0) {
    res.status(404);
    throw new Error("Dont have any cake!");
  }
  res.status(200).json(cakes);
});

const postCake = asyncHandler(async (req, res, next) => {
  const { name, image, type, price } = req.body;

  const cake = await Cake.create({
    name,
    image,
    type,
    price,
  });
  if (cake) {
    res.status(201).json(cake);
  } else {
    res.status(400);
    throw new Error("Cake data is not Valid");
  }
});
const deleteCake = asyncHandler(async (req, res, next) => {
  const cake = await Cake.findById(req.params.id);

  if (!cake) {
    res.status(404);
    throw new Error("Cake not found");
  }

  await Cake.deleteOne({ _id: cake._id });
  res.status(200).json({ message: "Cake deleted successfully" });
});

const updateCake = asyncHandler(async (req, res, next) => {
  const { name, image, type, price } = req.body;
  const cake = await Cake.findById(req.params.id);

  if (!cake) {
    res.status(404);
    throw new Error("Cake not found");
  }

  cake.name = name || cake.name;
  cake.image = image || cake.image;
  cake.type = type || cake.type;
  cake.price = price || cake.price;

  const updatedCake = await cake.save();
  res.status(200).json(updatedCake);
});




module.exports = {
  getAllCake,
  getSpecificCake,
  postCake,
  deleteCake,
  updateCake
};
// //@desc Get Vehicle
// //@route GET /api/Vehicles/:id
// //@access private
// const getVehicleById = asyncHandler(async (req, res, next) => {
//   const licensePlate = req.params.licensePlate;
//   const vehicle = await Vehicle.findOne({ licensePlate });
//   if (!vehicle) {
//     res.status(404);
//     throw new Error('Vehicle Not Found!');
//   }
//   res.status(200).json(vehicle);
// });

// //@desc Update Vehicle
// //@route PUT /api/Vehicles/:id
// //@access private
// const updateVehicles = asyncHandler(async (req, res, next) => {
//   const licensePlate = req.params.licensePlate;
//   const vehicle = await Vehicle.findOne({ licensePlate });
//   if (!vehicle) {
//     res.status(404);
//     throw new Error('Vehicle Not Found!');
//   }
//   const { description, insurance, image, price } = req.body;
//   if (!description || !insurance || image || price) {
//     res.status(400);
//     throw new Error('All field not be empty!');
//   }
//   const userId = vehicle.user_id.toString();
//   if (userId !== req.user.id) {
//     res.status(403);
//     throw new Error(
//       "You don't have permission to update vehicle's information!"
//     );
//   }
//   const updateVehicle = await Vehicle.findByIdAndUpdate(
//     vehicle._id.toString(),
//     req.body,
//     {
//       new: true,
//     }
//   );
//   res.status(200).json(updateVehicle);
// });

// //@desc Delete Vehicle
// //@route DELETE /api/Vehicles/:id
// //@access private

// const uploadVehicleFromExcel = async (req, res, next) => {
//   const workbook = XLSX.readFile(req.file.path, { sheetStubs: true });
//   const sheet_nameList = workbook.SheetNames;
//   let x = 0;
//   let count = 0;
//   let totalVehicle = 0;
//   let totalVehicleDetails = 0;
//   sheet_nameList.forEach(async (element) => {
//     const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_nameList[x]]);
//     xlData.forEach(async (item) => {
//       count++;
//       // data from excel file
//       const licensePlate = item.licensePlate;
//       const description = item.description;
//       const insurance = item.insurance;
//       const price = item.price;
//       const image = item.image;
//       const vehicleType = item.vehicleType;
//       const manufacturer = item.manufacturer;
//       const model = item.model;
//       const yearOfManufacturer = item.yearOfManufacturer;
//       const fuelType = item.fuelType;
//       const transmission = item.transmission;

//       const isDuplicate = await Vehicle.findOne({
//         licensePlate,
//       });
//       if (
//         !isDuplicate &&
//         insurance !== undefined &&
//         price !== undefined &&
//         image !== undefined
//       ) {
//         const vehicle = await Vehicle.create({
//           user_id: req.user.id,
//           licensePlate,
//           description,
//           insurance,
//           price,
//           image,
//           isRented: false,
//         });
//         if (vehicle) {
//           totalVehicle++;
//           const isDuplicate = await VehicleDetails.findOne({
//             licensePlate,
//           });
//           if (
//             !isDuplicate &&
//             vehicleType !== undefined &&
//             manufacturer !== undefined &&
//             model !== undefined &&
//             yearOfManufacturer !== undefined &&
//             fuelType !== undefined &&
//             transmission !== undefined
//           ) {
//             totalVehicleDetails++;
//             const vehicleDetail = await VehicleDetails.create({
//               licensePlate,
//               vehicleType,
//               manufacturer,
//               model,
//               yearOfManufacturer,
//               fuelType,
//               transmission,
//             });
//             if (!vehicleDetail) {
//               res.status(400);
//               throw new Error(
//                 'Something went wrong in create vehicleDetails when loading excel file'
//               );
//             }
//           }
//         } else {
//           res.status(400);
//           throw new Error(
//             'Something went wrong with the Excel file. Please check carefully!'
//           );
//         }
//       }
//     });
//     x++;
//   });
//   res.status(201).json({
//     message: `Successfully loaded excel file! Total Vehicles: ${totalVehicle}, Total Vehicle Details: ${totalVehicleDetails}`,
//   });
// };
