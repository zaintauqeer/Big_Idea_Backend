import portfolio from '../models/portfolioModel.js';
import service from '../models/serviceModel.js';
import clients from '../models/clientModel.js';

export const getCounts = async (req, res) => {
  try {
    const [portfolioCount, serviceCount, clientCount] = await Promise.all([
      portfolio.countDocuments(),
      service.countDocuments(),
      clients.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        portfolios: portfolioCount,
        services: serviceCount,
        clients: clientCount,
      },
    });
  } catch (error) {
    console.error("Error fetching counts:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};