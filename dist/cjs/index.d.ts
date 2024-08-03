/**
 * vite-plugin-external
 * 1. 处理JS模块中导入方式，修改为 window['vue']方式
 * 2. 自动把外部链接插入到HTML中
 */
import { PluginOption } from 'vite';
import { Options } from './types';
import { UserOptions } from 'vite-plugin-externals/dist/src/types';
export declare function VitePluginExternals(options: Options, userOptions?: UserOptions): PluginOption;
