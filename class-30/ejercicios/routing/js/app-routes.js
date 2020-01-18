page.base('/');
page('*', showActiveLink);
page('/', showHistory);
page('/station', showExtensions);
page('/weahter', showSettings);
page('*', notfound);
page();