/**
 * 类型定义
 */
export interface External {
    [key: string]: {
        /** 远程地址 */
        src?: string;
        /** 变量名称 */
        varName: string;
        /** 脚本注入位置 */
        inject?: 'head' | 'body';
        /** 是否为defer */
        defer?: boolean;
        /** 是否为async */
        async?: boolean;
    };
}
export type Options = Partial<External>;
