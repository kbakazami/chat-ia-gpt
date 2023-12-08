/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        // config.externals is needed to resolve the following errors:
        // Module not found: Can't resolve 'bufferutil'
        // Module not found: Can't resolve 'utf-8-validate'
        config.externals.push({
            bufferutil: 'bufferutil',
            'utf-8-validate': 'utf-8-validate',
        });

        return config;
    },
    reactStrictMode: false,
}

module.exports = nextConfig