// Временное решение
import { getToken, request, mock } from '.';

function fetchData(iface: string) {
  return async (packet: any) => {
    const [method, args]: any = Object.entries(packet)[0];
    const path = `${iface}/${method}`;
    const token = await getToken();
    if (args.mock) return await mock({ path, args, token });
    let res = await request({ path, args, token });
    if(res.msg === "wrong-token") {
      const token = await getToken()
      res = await request({ path, args, token });
    }
    return res
  };
}

export default fetchData;
