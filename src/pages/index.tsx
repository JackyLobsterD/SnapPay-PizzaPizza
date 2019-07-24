import React from 'react';
import styles from './index.css';
import { formatMessage } from 'umi-plugin-locale';
import Link from 'umi/link';
import router from 'umi/router';


export default function() {
  console.log('page/index');
  router.push("/HomePage")
  return (
    <div>
    </div>
  );
}
