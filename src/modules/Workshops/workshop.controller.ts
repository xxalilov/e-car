import { NextFunction, Request, Response } from "express";
import WorkshopService from "./workshop.service";

class WorkshopController {
  private workshopService = new WorkshopService();

  public async getAllWorkshops(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    try {
      const findAllWorkshopData = await this.workshopService.getAllWorkshops(
        page,
        pageSize
      );
      res.status(200).json({ ...findAllWorkshopData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  }

  public async createWorkshop(req: Request, res: Response, next: NextFunction) {
    try {
      const workshopData = req.body;
      const newWorkshop = await this.workshopService.createWorkshop(
        workshopData
      );
      res.status(201).json({ data: newWorkshop, message: "created" });
    } catch (error) {
      next(error);
    }
  }

  public async updateWorkshop(req: Request, res: Response, next: NextFunction) {
    try {
      const workshopData = req.body;
      const workshopId = req.params.id;
      const updatedWorkshop = await this.workshopService.updateWorkshop(
        workshopData,
        workshopId
      );
      res.status(200).json({ data: updatedWorkshop, message: "updated" });
    } catch (error) {
      next(error);
    }
  }

  public async deleteWorkshop(req: Request, res: Response, next: NextFunction) {
    try {
      const workshopId = req.params.id;
      const deletedWorkshop = await this.workshopService.deleteWorkshop(
        workshopId
      );
      res.status(200).json({ data: deletedWorkshop, message: "deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default WorkshopController;
