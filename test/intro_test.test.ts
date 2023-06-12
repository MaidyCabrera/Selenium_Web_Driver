import {Builder, By, WebDriver} from 'selenium-webdriver'
import assert from 'assert'
import chrome from 'selenium-webdriver/chrome'

//Describir Pruebas
jest.setTimeout(10000)

describe(
    'Primer Prueba Selenium',
    ()=>{
        //Definir un objeto de la clase webDriver
        let miNavegador:WebDriver

        //Metodo beforeAll
        beforeAll(
            async()=>{
                miNavegador = await new Builder().forBrowser('chrome').build()
            }
        )

        //Metodo afterAll
        afterAll(
            async()=>{
                await miNavegador.quit()
            }
        )

        //Crear las Pruebas
        test(
            'Prueba Ejemplo Selenium',
            async ()=>{
                await miNavegador.get('https://www.selenium.dev/selenium/web/web-form.html')
                // await miNavegador.sleep(1000)
                let titulo = await miNavegador.getTitle()
                assert.equal("Web form", titulo)

                //Hacer referencia a un elemento del DOM
                let miElemento = await miNavegador.findElement(By.name('my-text'))
                await miElemento.sendKeys("Selenium")
                
                let miBoton=await miNavegador.findElement(By.css('button'))
                await miNavegador.sleep(1000)
                await miBoton.click()
                
                let miMensaje = await miNavegador.findElement(By.id('message'))
                let texto = await  miMensaje.getText()
                assert.equal(texto, 'Received!')
                await miNavegador.sleep(1000)
            }
        )
    }
)
