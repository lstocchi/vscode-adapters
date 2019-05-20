/*-----------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Licensed under the EPL v2.0 License. See LICENSE file in the project root for license information.
 *-----------------------------------------------------------------------------------------------*/

import { DebugInfo } from './DebugInfo';
import { Protocol, RSPClient } from 'rsp-client';

export class DebugInfoProvider {
    public static async retrieve(server: Protocol.ServerHandle, client: RSPClient): Promise<DebugInfo> {
        const launchCommand: Protocol.CommandLineDetails = await client.getOutgoingHandler().getLaunchCommand({
            mode: 'debug',
            params: {
                id: server.id,
                serverType: server.type.id,
                attributes: undefined
            }
        });

        return this.create(launchCommand);
    }

    public static create(details: Protocol.CommandLineDetails): DebugInfo {
        return new DebugInfo(details);
    }

}
