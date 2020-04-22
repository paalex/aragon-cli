import { ethers } from 'ethers'
import { useEnvironment } from '../../helpers/useEnvironment'
import { kernelAbi } from '../../contractAbis'

/**
 * Returns the current app base namesapce for an appId
 *
 * @param dao DAO address
 * @param environment Envrionment
 * @return basesNamespace
 */
export async function getBasesNamespace(
  dao: string,
  environment: string
): Promise<string> {
  const { provider } = useEnvironment(environment)

  const kernel = new ethers.Contract(dao, kernelAbi, provider)

  return kernel.methods.APP_BASES_NAMESPACE().call()
}

/**
 * Returns the current app base address for an appId
 *
 * @param dao DAO address
 * @param appId APP id to get the base of
 * @param environment Envrionment
 * @return currentBaseAddress
 */
export async function getAppBase(
  dao: string,
  appId: string,
  environment: string
): Promise<string> {
  const { provider } = useEnvironment(environment)

  const kernel = new ethers.Contract(dao, kernelAbi, provider)

  const basesNamespace = await getBasesNamespace(dao, environment)
  return kernel.methods.getApp(basesNamespace, appId).call()
}
