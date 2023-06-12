import { Builder, By, WebDriver, Key } from 'selenium-webdriver'
import assert from 'assert'
import chrome from 'selenium-webdriver/chrome'

//Describir Pruebas
jest.setTimeout(10000)

describe(
    'Prueba Controlada Página Atenea',
    () => {
        //Definir un objeto de la clase webDriver
        let miNavegador: WebDriver

        //Metodo beforeAll
        beforeAll(
            async () => {
                miNavegador = await new Builder().forBrowser('chrome').build()
            }
        )

        //Metodo afterAll
        afterAll(
            async () => {
                await miNavegador.quit()
            }
        )

        //Crear las Pruebas
        test(
            'Prueba funcionalida buscar Atenea',
            async () => {
                await miNavegador.get('https://agenciaatenea.gov.co/')
                // await miNavegador.sleep(1000)
                let titulo = await miNavegador.getTitle()
                assert.match(titulo, /Atenea/i)

                //Conectarme a una API y obtener una palabra
                for (let i = 0; i < 10; i++) {
                    let respuesta = await fetch('https://random-word-api.herokuapp.com/word?number=10')
                    let palabra = await respuesta.json()
                    let miBusqueda = await miNavegador.findElement(By.id('edit-keys'))
                    await miBusqueda.sendKeys(palabra[0], Key.RETURN)
                    await miNavegador.sleep(1000)
                }



                //Hacer referencia a un elemento del DOM
                // let miBusqueda= await miNavegador.findElement(By.id('edit-keys'))
                // await  miBusqueda.sendKeys("ejemplo", Key.RETURN)
                // await miNavegador.sleep(1000)

            }
        )
    }
)
