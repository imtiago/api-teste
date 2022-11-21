import { ApplicationContract } from "@ioc:Adonis/Core/Application";
// import CamelCaseNamingStrategy from 'App/Strategies/CamelCaseNamingStrategy'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    // const { BaseModel } = await import('@ioc:Adonis/Lucid/Orm')
    // BaseModel.namingStrategy = new CamelCaseNamingStrategy()
    // IoC container is ready
  }

  public async ready() {
    // App is ready
    // const QueueService = (await import("App/services/WhatsApp")).default;
    // QueueService.initialize();
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
